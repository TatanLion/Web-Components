class myElement extends HTMLElement {
  constructor(){
    super();
    //Agregamos ShadowDom
    this.attachShadow({mode: 'open'});

    //Capturamos los elementos para usarlos en el HTML
    this.title = this.getAttribute('title');
    this.parrafo = this.getAttribute('parrafo');
    this.img = this.getAttribute('img');
  }

  getTemplate(){
    const template = document.createElement('template');
    //Usamos las variables que capturamos en la parte de arriba para poder imprimir el texto allí
    template.innerHTML = `
      <section>
        <h2>${this.title}</h2>
        <p>${this.parrafo}</p>
        <img src="${this.img}">
      </section>
      ${this.getStyles()}
    `;
    return template;
  }
  getStyles(){
    return `
      <style>
        h2{
          color: red;
        }
      </style>
    `;
  }
  render(){
    //Ya que activamos el shadow root, tendremos que llamar el elemento de forma diferente para que lo renderice y no tengamos conflicto con nuestros estilos.
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback(){
    this.render();
  }
}

customElements.define('my-element' , myElement); //* Definimos que la clase se va a convertir en una etiqueta