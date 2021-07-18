import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(requests, response) {

    if(requests.method === 'POST') {
        const TOKEN = '97b704b5b542e065723ef8c5030f2a';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "968036", //ID do model de 'comunities' criado pelo DATO
            // ...request.body,
            title: "Pinguim",
            imageUrl: "https://news.microsoft.com/wp-content/uploads/prod/sites/42/2020/09/MS_Penguin-Counting-Story_1900x800-1600x674-1-960x629.jpg",
            url: "https://news.microsoft.com/wp-content/uploads/prod/sites/42/2020/09/MS_Penguin-Counting-Story_1900x800-1600x674-1-960x629.jpg",
            creatorSlug: "FabioTakamura",
        })
    
        console.log(registroCriado);
    
        response.json({
            dados: 'Alguma coisa',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Não tem nada no GET, mas tem no POST'
    })
}