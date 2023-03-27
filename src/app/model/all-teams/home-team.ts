export interface HomeTeam  {
    abbreviation: string,
    city: string,
    conference: string,
    division: string,
    full_name: string,
    id: number,
    name: string,
    imageUrl?: string,
    scoreList?: string[],
    scoreAverage?: number,
    scoreBoth?: string[]
}