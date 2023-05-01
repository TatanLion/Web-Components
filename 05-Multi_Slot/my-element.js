class myElement extends HTMLElement {
  constructor(){
    super();
    //Agregamos ShadowDom
    this.attachShadow({mode: 'open'});
  }

  getTemplate(){
    const template = document.createElement('template');
    template.innerHTML = `
      <section>
        <h2>
          <slot name="title"></slot>
        </h2>
        <p>
          <slot name="parrafo"></slot>
        </p>
      </section>
      ${this.getStyles()};
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