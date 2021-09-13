//使用模板字符串定义组件模板
const template = document.createElement('template')
template.innerHTML = ` <style>
.mask{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
}
.dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-80%);
    border-radius: 8px;
    background: #fff;
    min-width: 550px;
}
.head{
    height: 30px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(218, 215, 215);
    font-size: 16px;
}
.head_close:hover{
    cursor: pointer;
    color: rgb(145, 145, 150);
}
.body{
    padding: 10px;
    min-height: 100px;
}
.footer{
    padding: 10px;
    display: flex;
    justify-content:flex-end;
    align-items: center;
    height: 50px;
    border-top: 1px solid rgb(218, 215, 215);;
}
.footer_yes,.footer_cancel{
    width: 80px;
    height: 40px;
    border:none;
    color: white;
    border-radius: 8px;
}
.footer_yes{
    background-color: cadetblue;
}
.footer_cancel{
    background-color: gray;
    margin-left: 20px;
}
.footer_yes:hover,.footer_cancel:hover{
    cursor: pointer;
    border: 1px solid paleturquoise;
}
</style>
<div class="mask">
<div class="dialog">
<header class="head">
    <span class="head_title"><slot name="modal-title"></slot></span>
    <span class="head_close">X</span>
</header>
<div class="body"> 
    <slot name="modal-content">modal content</slot>
</div>
<footer class="footer">
    <button class="footer_yes">确定</button>
    <button class="footer_cancel">取消</button>
</footer>
</div>
</div>`

class Modal extends HTMLElement{
    constructor(){
        super()
        //获取模板content
        // let tpl = document.getElementById('modal_tpl')
        let tplContent = template.content
        
        //设置shadow模式，克隆模板
        const shadow = this.attachShadow({mode:'open'})
        this.content = tplContent.cloneNode(true)
        
        //获取需要的元素
        this.mask = this.content.querySelector('.mask')
        this.dialog = this.content.querySelector('.dialog')
        this.close = this.content.querySelector('.head_close')
        this.cancel = this.content.querySelector('.footer_cancel')

        this.modalInit()
        //设置宽度
        this.setWidth()
        //关闭和取消点击事件
        this.closeBtn()
        this.cancelBtn()   

        shadow.appendChild(this.content)
    }
    static get observedAttributes () {
        return ['isshow'];
    }
    get isshow (){
        return this.getAttribute('isshow')
    }
    set isshow (value) {
        this.setAttribute('isshow', value)
    }
    //元素插入DOM
    connectedCallback(){
        console.log('connectedCallback')
    }
    //元素从DOM删除
    disconnectedCallback(){
        console.log('disconnectedCallback')
    }
    //移动元素
    adoptedCallback(){
        console.log('adoptedCallback')
    }
    //元素的属性
    attributeChangedCallback(name, oldVal, newVal){
        if(name === 'isshow'){
            if(newVal === 'true'){
                this.showModal()
            }
            if(newVal === 'false'){
                this.closeModal()
            }
        }
       
    }
    modalInit(){
        let isShow = this.getAttribute('isshow')
        console.log('inite',isShow)
        isShow === 'true' ?this.showModal(): this.closeModal()
    }
    setWidth(dialog){
        //获取自定义width并设置值
        let myWidth = this.getAttribute('width')
        this.dialog.style.width = myWidth > 550? myWidth+'px' : 550+'px'
    }
    showModal(){

       this.mask.style.display = 'block'
       this.dialog.style.display = 'block'
    }
    closeModal(){
       this.mask.style.display = 'none'
       this.dialog.style.display = 'none'
       //this.setAttribute('isshow', 'false')
    }
    closeBtn(){
        this.close.addEventListener('click',() => {
            this.closeModal()
        })
    }
    cancelBtn(){
        this.cancel.addEventListener('click',() => {
            this.closeModal()
        })
    }
    
}

customElements.define('my-modal',Modal)