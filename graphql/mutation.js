import gql from 'graphql-tag';

export const INSERT_SCOUTING_DETAILS = gql `
    mutation insertScoutingDetails($objects: [bug_scout_insert_input!]!) {
        insert_bug_scout(objects: $objects) {
            returning {
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
        }
    }`

