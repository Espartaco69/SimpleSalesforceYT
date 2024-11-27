import { LightningElement } from 'lwc';

export default class SimpleCard extends LightningElement {
    cards = [
        {
            id: 1,
            title: 'Wikipedia - Torre Eiffel',
            description: 'Una de las estructuras más famosas del mundo, ubicada en París.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg'
        },
        {
            id: 2,
            title: 'Wikipedia - Gran Cañón',
            description: 'Un impresionante cañón ubicado en Arizona, Estados Unidos.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Grand_Canyon_view_from_Pima_Point_2010.jpg/320px-Grand_Canyon_view_from_Pima_Point_2010.jpg'
        },
        {
            id: 3,
            title: 'Wikipedia - Estatua de la Libertad',
            description: 'Un icono de libertad en Nueva York, Estados Unidos.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg'
        }
    ];
}
