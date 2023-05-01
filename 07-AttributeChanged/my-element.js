class myElement extends HTMLElement {
  constructor(){
    super();
    //Agregamos ShadowDom
    this.attachShadow({mode: 'open'});
  }

  //Es un observador que revisara cambios en el componente
  static get observedAtrtributes(){
    return['title', 'parrafo', 'img'];
  }

  attributeChangedCallback(attr, oldVal, newVal){
    if(oldVal !== newVal){
      this[attr] = newVal;
      // valida que el componente este montado para que solo 
      // renderize cuando realmente exista un cambio en las propiuedades
      // ya que al dejarlo asi estas renderizando el componente por cada 
      // propiedad this.shadowRoot.children[0] = al componente que estas creando
      // de esta manera solo renderizara cada vez que cambies una atributo
      if (this.shadowRoot.children[0]) {
        this.render();
      }
    }
  }

  // //Opción vieja y con bug (CLASE)
  // attributeChangedCallback(attr, oldVal, newVal){
  //   if(attr === "title"){
  //     this.title = newVal;
  //   }
  //   if(attr === "parrafo"){
  //     this.parrafo = newVal;
  //   }
  //   if(attr === "img"){
  //     this.img = newVal;
  //   }
  // }

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