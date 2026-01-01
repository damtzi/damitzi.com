export type Concert = {
    artist: string;
    date: string;
    location: string;
    festival?: string;
    id: string;
};

export type StravaAuthResponse = {
    token_type: string;
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
};

export type Athlete = {
    id: number;
    resource_state: number;
};

export type Map = {
    id: string;
    summary_polyline: string;
    resource_state: number;
};

export type Activity = {
    private: boolean;
    manual: boolean;
    commute: boolean;
    location_city: string | null;
    kudos_count: number;
    id: number;
    gear_id: string | null;
    pr_count: number;
    sport_type: string;
    moving_time: number;
    location_country: string | null;
    has_heartrate: boolean;
    display_hide_heartrate_option: boolean;
    total_photo_count: number;
    external_id: string;
    athlete: Athlete;
    type: string;
    achievement_count: number;
    average_cadence?: number;
    max_heartrate: number;
    athlete_count: number;
    average_speed: number;
    upload_id: number;
    elev_low: number;
    elapsed_time: number;
    trainer: boolean;
    upload_id_str: string;
    distance: number;
    start_latlng: number[];
    resource_state: number;
    name: string;
    average_heartrate: number;
    heartrate_opt_out: boolean;
    comment_count: number;
    has_kudoed: boolean;
    start_date: string;
    start_date_local: string;
    map: Map;
    max_speed: number;
    location_state: string | null;
    total_elevation_gain: number;
    flagged: boolean;
    visibility: string;
    photo_count: number;
    elev_high: number;
    end_latlng: number[];
    utc_offset: number;
    from_accepted_tag: boolean;
    workout_type?: string | null;
    timezone: string;
};

export type BasicInformation = {
    [x: string]: any;
    cover_image: string;
    id: number;
    thumb: string;
    year: number;
    title: string;
    genres: string[];
    styles: string[];
    artists: Artist[];
    master_url: string;
    resource_url: string;
    formats: Formats[];
    labels: Label[];
};

export type Label = {
    id: string;
    name: string;
};

export type Formats = {
    descriptions: string[];
    name: string;
    qty: string;
    text: string;
};

export type Artist = {
    anv: string;
    id: string;
    name: string;
    resource_url: string;
    role: string;
    tracks: string;
};

export type Pagination = {
    page: number;
    pages: number;
    per_page: number;
    items: number;
    urls: any;
};

export type Image = {
    type: 'primary' | 'secondary';
    resource_url: string;
};

export type CollectionsRecord = {
    id: number;
    instance_id: number;
    date_added: string;
    rating: 0;
    basic_information: BasicInformation;
};

export type CollectionsResponse = {
    pagination: Pagination;
    releases: CollectionsRecord[];
};

export type ReleaseResponse = {
    id: number;
    title: string;
    notes: string;
    released: string;
    year: number;
    resource_url: string;
    uri: string;
    artists: Artist[];
    labels: Label[];
    formats: Formats[];
    genres: string[];
    styles: string[];
    images: Image[];
    thumb: string;
};

export type DiscogsRelease = {
    id: number;
    status: string;
    year: number;
    resource_url: string;
    uri: string;
    artists: DiscogsArtist[];
    artists_sort: string;
    labels: DiscogsLabel[];
    series: any[]; // No data provided, keep as any[]
    companies: DiscogsCompany[];
    formats: DiscogsFormat[];
    data_quality: string;
    community: DiscogsCommunity;
    format_quantity: number;
    date_added: string; // ISO 8601 string
    date_changed: string; // ISO 8601 string
    num_for_sale: number;
    lowest_price: number;
    master_id: number;
    master_url: string;
    title: string;
    country: string;
    released: string; // Date string YYYY-MM-DD
    notes: string;
    released_formatted: string;
    identifiers: DiscogsIdentifier[];
    videos: DiscogsVideo[];
    genres: string[];
    styles: string[];
    tracklist: DiscogsTrack[];
    extraartists: DiscogsExtraArtist[];
    images: DiscogsImage[];
    thumb: string;
    estimated_weight: number;
    blocked_from_sale: boolean;
    is_offensive: boolean;
};

export type DiscogsArtist = {
    id: number;
    name: string;
    anv: string;
    join: string;
    role: string;
    tracks: string;
    resource_url: string;
    thumbnail_url?: string;
};

export type DiscogsLabel = {
    id: number;
    name: string;
    catno: string;
    entity_type: string;
    entity_type_name: string;
    resource_url: string;
    thumbnail_url?: string;
};

export type DiscogsCompany = {
    id: number;
    name: string;
    catno: string;
    entity_type: string;
    entity_type_name: string;
    resource_url: string;
    thumbnail_url?: string;
};

export type DiscogsFormat = {
    name: string;
    qty: string;
    descriptions: string[];
    text?: string;
};

export type DiscogsCommunity = {
    have: number;
    want: number;
    rating: {
        count: number;
        average: number;
    };
    submitter: {
        username: string;
        resource_url: string;
    };
    contributors: {
        username: string;
        resource_url: string;
    }[];
    data_quality: string;
    status: string;
};

export type DiscogsIdentifier = {
    type: string;
    value: string;
    description?: string;
};

export type DiscogsVideo = {
    uri: string;
    title: string;
    description: string;
    duration: number;
    embed: boolean;
};

export type DiscogsTrack = {
    position: string;
    type_: string;
    title: string;
    duration: string;
    extraartists: DiscogsExtraArtist[];
};

export type DiscogsExtraArtist = {
    id: number;
    name: string;
    anv: string;
    join: string;
    role: string;
    tracks: string;
    resource_url: string;
};

export type DiscogsImage = {
    type: 'primary' | 'secondary';
    uri: string;
    resource_url: string;
    uri150: string;
    width: number;
    height: number;
};

export type Recipe = {
    title: string;
    slug: string;
    description: string;
    published: boolean;
};

export type TopPick = {
    title: string;
    slug: string;
    description: string;
    published: boolean;
};
