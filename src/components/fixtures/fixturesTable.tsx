import React, { useCallback, useMemo, useState } from 'react';
import { Fixture } from '../../models/dataModels';
import Button from '../shared/Button';
import style from '../shared/sharedStyles.module.scss';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import TableSortIcon from '../shared/TableSortIcon';

const FixturesTable = ({ fixtures }: { fixtures: Fixture[] }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState<{
        field: keyof Fixture;
        way: 'asc' | 'desc';
    }>({ field: 'country_name', way: 'asc' });
    const [filter, setFilter] = useState<{
        [key in keyof Fixture]: string;
    }>({
        country_name: '',
        start_time: '',
        away: '',
        competition: '',
        fixture_id: '',
        home: '',
    });

    const _fixtures = useMemo(() => {
        const _fixture = fixtures.filter((fixture) => {
            if (Object.values(filter).every((value) => value == ''))
                return true;
            const a = Object.keys(filter).map((f) => {
                if (filter[f as unknown as keyof Fixture] == '') return;
                return (
                    fixture[f as unknown as keyof Fixture] ==
                    filter[f as unknown as keyof Fixture]
                );
            });
            return a.every((e) => e == true || e == undefined);
        });
        return _fixture
            .sort((a, b) => {
                if (sort.way == 'asc') {
                    if (a[sort.field] < b[sort.field]) return -1;
                    return 1;
                } else {
                    if (a[sort.field] > b[sort.field]) return -1;
                    return 1;
                }
            })
            .slice(currentPage * 10 - 10, currentPage * 10);
    }, [fixtures, filter, currentPage, sort.way, sort.field]);

    const handleNextPage = useCallback(() => {
        setCurrentPage((currentPage) => currentPage + 1);
    }, []);

    const handlePreviousPage = useCallback(() => {
        setCurrentPage((currentPage) => currentPage - 1);
    }, []);

    const handleRowClick = useCallback(
        (id: string) => {
            navigate(`/viewFixture/${id}`);
        },

        [navigate]
    );

    const handleHeaderClick = useCallback((field: keyof Fixture) => {
        setSort((sort) => {
            return {
                field: field,
                way: sort.way == 'asc' ? 'desc' : 'asc',
            };
        });
    }, []);

    const countryList = useMemo(() => {
        const countries = fixtures
            .map((fixture) => fixture.country_name)
            .sort((a, b) => {
                if (a < b) return -1;
                return 1;
            });
        return [...new Set(countries)];
    }, [fixtures]);

    const competitionList = useMemo(() => {
        const competitions = fixtures
            .map((fixture) => fixture.competition)
            .sort((a, b) => {
                if (a < b) return -1;
                return 1;
            });
        return [...new Set(competitions)];
    }, [fixtures]);

    const handleFilterChange = useCallback(
        (fieldName: keyof Fixture, value: string) => {
            setFilter((filter) => {
                return { ...filter, [fieldName]: value };
            });
        },
        []
    );

    return (
        <div className={`w-full h-full flex flex-col`}>
            <h1 className={`text-2xl mb-2`}>Fixtures</h1>
            <div className={`grid grid-cols-4 gap-3`}>
                <div className={`flex flex-col`}>
                    <label>Country</label>
                    <select
                        onChange={(e) =>
                            handleFilterChange('country_name', e.target.value)
                        }
                        className={`my-3 bg-slate-200 p-2`}
                    >
                        <option value={''}>All</option>
                        {countryList.map((country, i) => (
                            <option key={i} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={`flex flex-col`}>
                    <label>Competition</label>
                    <select
                        onChange={(e) =>
                            handleFilterChange('competition', e.target.value)
                        }
                        className={`my-3 bg-slate-200 p-2`}
                    >
                        <option value={''}>All</option>
                        {competitionList.map((competition, i) => (
                            <option key={i} value={competition}>
                                {competition}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={`h-full w-full grow`}>
                <table className={`${style.table}`}>
                    <thead>
                        <tr>
                            <td
                                onClick={() =>
                                    handleHeaderClick('country_name')
                                }
                            >
                                Country Name{' '}
                                {sort.field == 'country_name' && (
                                    <TableSortIcon way={sort.way} />
                                )}
                            </td>
                            <td
                                width={`300px`}
                                onClick={() => handleHeaderClick('competition')}
                            >
                                Competition{' '}
                                {sort.field == 'competition' && (
                                    <TableSortIcon way={sort.way} />
                                )}
                            </td>
                            <td
                                width={`200px`}
                                onClick={() => handleHeaderClick('home')}
                            >
                                Home
                                {sort.field == 'home' && (
                                    <TableSortIcon way={sort.way} />
                                )}
                            </td>
                            <td
                                width={`200px`}
                                onClick={() => handleHeaderClick('away')}
                            >
                                Away
                                {sort.field == 'away' && (
                                    <TableSortIcon way={sort.way} />
                                )}
                            </td>
                            <td
                                width={`200px`}
                                onClick={() => handleHeaderClick('start_time')}
                            >
                                Start Time
                                {sort.field == 'start_time' && (
                                    <TableSortIcon way={sort.way} />
                                )}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {_fixtures.length == 0 ? (
                            <tr>
                                <td colSpan={4}>No Data</td>
                            </tr>
                        ) : (
                            _fixtures.map((fixture, i) => {
                                return (
                                    <tr
                                        key={i}
                                        onClick={() =>
                                            handleRowClick(fixture.fixture_id)
                                        }
                                        className={`cursor-pointer`}
                                    >
                                        <td>{fixture.country_name}</td>
                                        <td>{fixture.competition}</td>
                                        <td>{fixture.home}</td>
                                        <td>{fixture.away}</td>
                                        <td>
                                            {dayjs(fixture.start_time).format(
                                                `DD/MM/YYYY HH:mm`
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <div className={`flex justify-between`}>
                <Button
                    text={'Previous'}
                    disabled={currentPage == 1}
                    onClick={handlePreviousPage}
                />
                <Button
                    text={'Next'}
                    disabled={_fixtures.length < 10}
                    onClick={handleNextPage}
                />
            </div>
        </div>
    );
};

export default FixturesTable;
