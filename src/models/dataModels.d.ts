export type Fixture = {
    fixture_id: string;
    start_time: string;
    country_name: string;
    competition: string;
    home: string;
    away: string;
};

export type Bookmaker = {
    bookmaker_id: string;
    name: string;
};

export type Odds = {
    bookmaker_id: string;
    odds_type: string;
    fixture_id: string;
    timestamp: string;
    market_parameters: string;
    price_names: string;
    prices: string;
};
