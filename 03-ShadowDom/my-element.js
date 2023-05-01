class myElement extends HTMLElement {
  constructor(){
    super();
  }

  getTemplate(){
    const template = document.createElement('template');
    template.innerHTML = `
      <section>
        <h2>Hola Mundo</h2>
        <div>
          <p>Soy más texto ejemplo</p>
        </div>
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
    this.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback(){
    this.render();
  }
}

customElements.define('my-element' , myElement); //* Definimos que la clase se va a convertir en una etiqueta