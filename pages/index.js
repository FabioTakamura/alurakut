import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>

      <ul>
        {propriedades.items.slice(0,6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.html_url}>
              <img src={itemAtual.avatar_url} />
              <span>{itemAtual.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const usuarioAlaetatorio = 'FabioTakamura';
  const [comunidades, setComunidades] = React.useState([{
    id: '021151065541654064651651654654',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    url: 'https://alurakut.fabiotakamura.vercel.app/'
  }]);
  console.log('nosso teste', comunidades);
  // const comunidades = ['Alurakut'];
  const amigos = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'wantorres315',
    'maluko',
    'jao',
  ];

  const [seguidores, setSeguidores] = React.useState([]);
  // Peagr array de dados do github
  React.useEffect(function() {
    fetch('https://api.github.com/users/peas/followers')
    .then(function (respostaDOServidor) {
      return respostaDOServidor.json();
    }) 
    .then(function (respostaCompleta) {
      setSeguidores(respostaCompleta);
      console.log(respostaCompleta);
    })
  }, []);


  return (
    <>
      <AlurakutMenu githubUser={usuarioAlaetatorio}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAlaetatorio}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet/>
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              console.log('Campo:', dadosDoForm.get('title'));
              console.log('Campo:', dadosDoForm.get('image'));
              console.log('Campo:', dadosDoForm.get('url'));

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
                url: dadosDoForm.get('url'),
              }

              // comunidades.push('Alura Stars');
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?" 
                  type="text"
                />
                <input 
                  placeholder="Coloque uma URL para usar de capa." 
                  name="image" 
                  aria-label="Coloque uma URL para usar de capa." 
                />
                <input 
                  placeholder="Coloque uma URL para a comunidade." 
                  name="url" 
                  aria-label="Coloque uma URL para a comunidade." 
                />

                <button>
                  Criar comunidade
                </button>

                <hr />
              </div>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({amigos.length})
            </h2>

            <ul>
              {amigos.slice(0,6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.slice(0,6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`${itemAtual.url}`} key={itemAtual.title}>
                      {<img src={itemAtual.image} />}
                      <span>{`${itemAtual.title}`}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title="Seguidores" items={seguidores} />

        </div>

      </MainGrid>
    </>
  )
}
