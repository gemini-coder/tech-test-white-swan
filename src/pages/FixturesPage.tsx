import React, { useMemo } from 'react';

import { Fixture } from '../models/dataModels';
import FixturesTable from '../components/fixtures/fixturesTable';
import AppLayout from '../layouts/AppLayout';
import { useLoaderData } from 'react-router-dom';

const FixturesPage = () => {
    const data = useLoaderData() as Fixture[];

    const fixtures = useMemo<Fixture[]>(() => {
        return data;
    }, [data]);

    return (
        <AppLayout>
            <div className={`w-full h-[800px]`}>
                <FixturesTable fixtures={fixtures} />
            </div>
        </AppLayout>
    );
};

export default FixturesPage;
