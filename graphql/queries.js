import gql from 'graphql-tag';

export const GET_SCOUTING_DETAILS = gql `
    query scoutingDetails {
        scouting_details {
            weekNumber
                scouterName
                id
                siteName
                location
                scoutType
                rowNumber
                header1
                header2
                header3
                header4
                miniBay
                text1
                text2
                text3
                text4
        }
    }`
