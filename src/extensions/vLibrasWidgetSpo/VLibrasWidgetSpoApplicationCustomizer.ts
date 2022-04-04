import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';

const LOG_SOURCE: string = 'VLibrasWidgetSpoApplicationCustomizer';



/**
 * Interface que descreve as propriedades da classe VLibrasWidgetSpoApplicationCustomizer
 * vindos do JSON ./src/config/serve.json.
 *
 * As propriedades widgetPosition definiem a posição do elemento <div> que renderiza o
 * player do tradutor.
 *
 * A propriedade widgetScriptSrc define o atributo src do elemento <script> que
 * integra o tradutor à página web.
 */
export interface IVLibrasWidgetSpoApplicationCustomizerProperties {
  widgetPositionTopValue: string,
  widgetPositionTopMeasure: string,
  widgetPositionRightValue: string,
  widgetPositionRightMeasure: string,
  widgetScriptSrc: string
}



/**
 * Classe da aplicação, que extende a classe BaseApplicationCustomizer.
 * As propriedades descritas pela interface IVLibrasWidgetSpoApplicationCustomizerProperties
 * são deserializadas no objeto BaseApplicationCustomizer.properties
 */
export default class VLibrasWidgetSpoApplicationCustomizer
  extends BaseApplicationCustomizer<IVLibrasWidgetSpoApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Inicializando VLibras Widget`);

    //  verifica se o posicionamento do player em relação à margem superior
    //  foi definido em px ou % e atribui o valor do arquivo de configuração
    if (this.properties.widgetPositionTopMeasure == 'percent') {
      this.properties.widgetPositionTopMeasure = '%'
    }
    let widgetPositionTop = `${this.properties.widgetPositionTopValue}${this.properties.widgetPositionTopMeasure}`;

    //  verifica se o posicionamento do player em relação à margem direita
    //  foi definido em px ou % e atribui o valor do arquivo de configuração
    if (this.properties.widgetPositionRightMeasure == 'percent') {
      this.properties.widgetPositionRightMeasure = '%'
    }
    let widgetPositionRight = `${this.properties.widgetPositionRightValue}${this.properties.widgetPositionRightMeasure}`;


    let body: HTMLBodyElement = document.getElementsByTagName('body')[0];


    // cria dinamicamente a tag <div> que contém o player do tradutor
    let widgetDisplay: HTMLDivElement = document.createElement('div');
    widgetDisplay.setAttribute('vw', '');
    widgetDisplay.style.top = widgetPositionTop;
    widgetDisplay.style.right = widgetPositionRight;
    widgetDisplay.classList.add('enabled');
    widgetDisplay.innerHTML = `
      <div vw-access-button class="active"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    `;
    body.appendChild(widgetDisplay);


    // cria dinamicamente as tags <script> que incorporam o tradutor
    let widgetImporter: HTMLScriptElement = document.createElement('script');
    widgetImporter.addEventListener('load', () => {
      let widgetLoader = document.createElement('script');
      let widgetCaller = document.createTextNode(`new window.VLibras.Widget('https://vlibras.gov.br/app');`);
      widgetLoader.appendChild(widgetCaller);
      body.appendChild(widgetLoader);
    });
    widgetImporter.type = 'text/javascript';
    widgetImporter.src = this.properties.widgetScriptSrc;
    body.appendChild(widgetImporter);


    return Promise.resolve();
  }
}
