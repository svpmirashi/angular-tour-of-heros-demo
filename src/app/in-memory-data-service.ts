import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero'



export class InMemoryDataService implements InMemoryDbService {
    createDb(){
        const heroes: Hero[] = [
            { id: 1, name: "Hero 1"},
            { id: 2, name: "Hero 2"},
            { id: 3, name: "Hero 3"},
            { id: 4, name: "Hero 4"},
            { id: 5, name: "Hero 5"},
            { id: 6, name: "Hero 6"},
            { id: 7, name: "Hero 7"},
            { id: 8, name: "Hero 8"},
            { id: 9, name: "Hero 9"},
            { id: 10, name: "Hero 10"}
        ];

        return { heroes };
    }
}
