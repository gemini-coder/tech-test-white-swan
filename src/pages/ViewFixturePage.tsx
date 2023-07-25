import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Fixture } from '../models/dataModels';
import Button from '../components/shared/Button';
import BookmakerOddsList from '../components/bookmakers/bookmakerOddsList';

const ViewFixturePage = () => {
    const navigate = useNavigate();

    const data = useLoaderData() as Fixture;

    return (
        <AppLayout>
            <div className={`h-[1000px]`}>
                <Button onClick={() => navigate('/')} text={'Back to list'} />
                <p className={`text-2xl underline`}>{data.competition}</p>
                <p>Country: {data.country_name}</p>
                <p>Home: {data.home}</p>
                <p>Away: {data.away}</p>
                <p>Start Time: {data.start_time}</p>
                <hr className={`my-4`} />
                <BookmakerOddsList fixture_id={data.fixture_id} />
            </div>
        </AppLayout>
    );
};

export default ViewFixturePage;
