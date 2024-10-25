export interface TeacherResponse {
    id:         string;
    title:      string;
    deleteAt?:  Date;
    person:     PersonResponse;
}

export interface PersonResponse {
    id:             string;
    full_name:      string;
    last_name:     string;
    email_address:   string;
    address:        string;
    male:           string;
    deleteAt?:      Date;
}
