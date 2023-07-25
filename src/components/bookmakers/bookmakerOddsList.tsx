import React, { useCallback, useMemo, useState } from 'react';
import bookmakerData from '../../data/bookmakers.json';
import oddsData from '../../data/odds.json';
import { Bookmaker, Odds } from '../../models/dataModels';
import style from '../shared/sharedStyles.module.scss';
import dayjs from 'dayjs';
import Button from '../shared/Button';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatPrice } from '../../utils/number';
import { useAuth } from '../../context/AuthContext';
dayjs.extend(relativeTime);

const BookmakerOddsList = ({ fixture_id }: { fixture_id: string }) => {
    const [asAtDate, setAsAtDate] = useState<number>(dayjs().valueOf());
    const [currentPage, setCurrentPage] = useState(1);

    const bookmakers = useMemo<Bookmaker[]>(() => {
        return bookmakerData
            .filter(
                (bookmaker) =>
                    oddsData.filter(
                        (odd) =>
                            odd.bookmaker_id == bookmaker.bookmaker_id &&
                            odd.fixture_id == fixture_id
                    ).length > 0
            )
            .sort((a, b) => {
                if (a.name < b.name) return -1;
                return 1;
            })
            .slice(currentPage * 10 - 10, currentPage * 10);
    }, [currentPage, fixture_id]);

    const handleNextPage = useCallback(() => {
        setCurrentPage((currentPage) => currentPage + 1);
    }, []);

    const handlePreviousPage = useCallback(() => {
        setCurrentPage((currentPage) => currentPage - 1);
    }, []);

    const handleDateChange = useCallback((date: string) => {
        setAsAtDate(dayjs(date).valueOf());
    }, []);

    if (bookmakers.length == 0) return <p>No bookmakers for this fixture</p>;

    return (
        <div className={`w-full h-full flex flex-col`}>
            <h1 className={`text-2xl mb-2`}>Bookmaker & Odds</h1>
            <p>
                As at date :
                <input
                    type={'datetime-local'}
                    onChange={(e) => handleDateChange(e.target.value)}
                    value={dayjs().toISOString()}
                />
            </p>

            <div className={`flex justify-between`}>
                <Button
                    text={'Previous'}
                    disabled={currentPage == 1}
                    onClick={handlePreviousPage}
                />
                <Button
                    text={'Next'}
                    disabled={bookmakers.length < 10}
                    onClick={handleNextPage}
                />
            </div>
            <div className={`h-full w-full grow`}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td width={`200px`}>Odds</td>
                            <td width={`150px`}>Prices</td>
                            <td width={`200px`}>Market Parameters</td>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmakers.map((bookmaker, i) => {
                            return (
                                <BookmakerItem
                                    bookmaker={bookmaker}
                                    fixture_id={fixture_id}
                                    key={i}
                                    asAtDate={asAtDate}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const BookmakerItem = ({
    bookmaker,
    fixture_id,
    asAtDate,
}: {
    bookmaker: Bookmaker;
    fixture_id: string;
    asAtDate: number;
}) => {
    const { user } = useAuth();

    const latestOdds = useMemo<Odds | null>(() => {
        return oddsData
            .filter((odd) => odd.timestamp < String(asAtDate))
            .sort((a, b) => {
                if (a.timestamp > b.timestamp) return -1;
                return 1;
            })
            .find(
                (odd) =>
                    odd.bookmaker_id == bookmaker.bookmaker_id &&
                    odd.fixture_id == fixture_id
            ) as Odds | null;
    }, [asAtDate, bookmaker.bookmaker_id, fixture_id]);

    if (!latestOdds) return <></>;
    return (
        <tr>
            <td>{bookmaker.name}</td>
            <td>
                {user?.permissions.includes('accessAllAreas') ? (
                    <>
                        {latestOdds.odds_type ?? '-'} (
                        <span className={`text-xs`}>
                            {dayjs(Number(latestOdds.timestamp)).fromNow()})
                        </span>
                    </>
                ) : (
                    '-'
                )}
            </td>
            <td>
                {user?.permissions.includes('accessAllAreas') ? (
                    <div className={`flex`}>
                        {JSON.parse(latestOdds.price_names).map(
                            (name: string, i: number) => {
                                const price = JSON.parse(latestOdds.prices)[i];
                                return (
                                    <span key={i} className={`w-[70px]`}>
                                        <p className={`font-bold`}>{name} </p>{' '}
                                        {formatPrice(price)}
                                    </span>
                                );
                            }
                        )}
                    </div>
                ) : (
                    '-'
                )}
            </td>
            <td>
                {user?.permissions.includes('accessAllAreas')
                    ? latestOdds.market_parameters
                    : '-'}
            </td>
        </tr>
    );
};

export default BookmakerOddsList;
