//考虑按钮的主题

class Button extends HTMLElement{
    constructor(){
        super()
 
        //获取模板内容
        let tpl = document.getElementById('btn_tpl')
        let tplContent = tpl.content

        //影子
        const shadowRoot = this.attachShadow({ mode: 'open'})
        const btn = document.createElement('button')
        btn.appendChild(tplContent.cloneNode(true))
        btn.setAttribute('class','my-button')

        const type = {
            'primary': '#06c',
            'warning': 'red',
            'default': '#4fc08d'
        }
        const btnType = this.getAttribute('type') 
        const btnColor = type[btnType]
       
        
        const style = document.createElement('style')
        style.textContent = `
            .my-button{
                font-size:16px;
                color:white;
                background-color:${btnColor}
            }
        `
        shadowRoot.appendChild(style)
        shadowRoot.appendChild(btn)
       
    }

}
customElements.define('my-button', Button)