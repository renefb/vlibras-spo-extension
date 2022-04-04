# VLibras-SPO
VLibras-SPO é uma extensão em SharePoint Framework (SPFx) para permitir a integração do VLibras Widget a sites do SharePoint Online (SPO).

## Sobre
[VLibras](https://www.vlibras.gov.br/) é um conjunto de soluções open-source que traduzem conteúdos digitais de Português brasileiro para a Linguagem Brasileira de Sinais (LIBRAS). Embora o pacote possua opções de integração/instalação destinadas a diferentes plataformas, ainda não existe uma opção nativa de integração com ambientes SPO. Por este motivo, foi desenvolvida a VLibras-SPO. 


VLibras-SPO é um componente de front-end, desenvolvido em Typescript, que pode ser hospedado no Catálogo de Aplicativos do seu tenant SPO e instalado em diferentes sites do tenant.

## Pré-requisitos
Seu ambiente de desenvolvimento deve contar com os seguintes recursos:
- Node.js versão 10.x ou posterior
- Gulp

Para a lista completa de requisitos para o ambiente de desenvolvimento de soluções SPFx, consulte a [documentação oficial da Microsoft](https://docs.microsoft.com/pt-br/sharepoint/dev/spfx/set-up-your-development-environment).

## Configuração
Uma vez clonado o repositório e antes de servir a extensão, verifique e, se necessário, altere as seguintes configurações do arquivo **/config/serve.json**:

**URL da página de testes:**
- `pageUrl`: URL de uma página qualquer do tenant SPO na qual você queira testar o VLibras-SPO, servindo-o localmente.

**Posicionamento do player do VLibras na página:**
- `widgetPositionTopValue`: valor do atributo de estilo "top" da div que contém o player.
- `widgetPositionTopMeasure`: unidade de medida do atributo de estilo "top" da div que contém o player (px ou %).
- `widgetPositionRightValue`: valor do atributo de estilo "right" da div que contém o player.
- `widgetPositionRightMeasure`: unidade de medida do atributo de estilo "right" da div que contém o player (px ou %).

**Origem do script do tradutor**
- `widgetScriptSrc`: valor do atributo "src" do elemento script que incorpora o tradutor à página (verifique a [documentação oficial do VLibras](https://www.vlibras.gov.br/doc/widget/installation/webpageintegration.html) para validar a URL).


## Testando em localhost:
Para rodar a extensão localmente, execute os seguintes comandos no console/terminal, a partir do diretório da extensão:
```bash
npm i
npm i -g gulp
gulp serve
```


## Build e Release
O pacote da extensão é gerado com os seguintes comandos, executados a partir do diretório da extensão:
```bash
gulp bundle
gulp package-solution
```
Estes comandos criam o pacote com o caminho **/sharepoint/solution/vlibras-spo-extension.sppkg**. 

O pacote da extensão deve ser, então, carregado no Catálogo de Aplicativos do seu tenant do SPO, ficando disponível para instalação nos demais sites do tenant. Para informações sobre criação e uso do Catálogo de Aplicativos SPO, consulte a [documentação oficial da Microsoft](https://docs.microsoft.com/pt-br/sharepoint/dev/general-development/site-collection-app-catalog).
