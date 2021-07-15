import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(requests, response) {

    if(requests.method === 'POST') {
        const TOKEN = '95043ab6d336810508e50aa99533cb';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "968036", //ID do model de 'comunities' criado pelo DATO
            ...request.body,
            // title: "Teste",
            // imageUrl: "http://www.moreno.pe.gov.br/portal2/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
            // url: "http://www.moreno.pe.gov.br/portal2/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
            // creatorSlug: "FabioTakamura",
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