(function(){
    const template = document.createElement('template');
  
      template.innerHTML = `<div class="ncrChatSection">
        <div class="chat-header-panel clickable" id="chatButton">
            <div class="chat-btn">
                <img src="assets/images/Chat_Offline.svg" class="chat-status-icon-large">
                <span>CHAT HELP</span>
                <span id="sfchatMenuCaret" class="menu-toggle-icon">&#9660;</span>
            </div>
        </div>
        <!-- Chat Modal-->
        <div id="chatMenuContainer" class="menu-container" style="display: none;">
            <ul class="chatmenu-list">
                <li class="chatmenuLi li-space-below">Need Assistance?</li>
                <li class="chatmenuLi li-space-below">We're here to help!</li>
                <li class="chatmenuLi li-space-below">Support Times: M-F 4AM-4PM ET </li>
                <li class="chatmenuLi innerClickable" href="javascript://Chat" id="startChat" style="display: none;">
                    <img src="assets/images/Chat_Offline.svg" class="chat-status-icon-small" id="innerChatIcon">
                    Chat with a Person
                </li>
                <li class="chatmenuLi innerClickable li-space-below"><a href="mailto:QuoteBuilder.Support@ncr.com?Subject=QuoteBuilder%20Assistance" target="_blank">Send us an email</a></li>
            </ul>
        </div>
    </div>
    <style>
        /* Chat Button CSS */
        @import url("https://fonts.googleapis.com/css?family=Lato");
        .ncrChatSection{
            display: block;
            position: relative;
            font-family: 'Lato', sans-serif;
        }
        .chat-header-panel {
            display: flex;
            align-items: center;
            white-space: nowrap;
            padding-right: 0.25em;
            border-right: 1px solid gray;
            padding-left: 0.75em;
        }
        .chat-btn{
            background-color: #70bf60;
            padding: 0.5em;
            margin: 0.5em;
            border: 1px solid #70bf60;
            border-radius: 2px;
        }
        .chat-status-icon-large {
            height: 1.3em; /* 1.8vh */
            padding-right: 0.2em;
            margin-bottom: -0.2em;
        }
        .clickable {
                cursor: pointer;
            }
        .menu-toggle-icon {
            padding: 0.3em;
            color: #4e4848;
        }
        /*-- Chat Modal Css--*/
        .menu-container {
            z-index: 2;
            position: absolute;
            top: 12vh;
            left: 4vw;
            font-size: 1.3em;
            background-color: #E6E6E6;
            border-radius: 3px;
            box-shadow: 0 1px 2px 4px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.2);
            }
            .menu-container:before {
            position: absolute;
            top: -1.15em;
            left: 3.5em;
            display: inline-block;
            border-right: 1.25em solid transparent;
            border-bottom: 1.25em solid #E6E6E6;
            border-left: 1.25em solid transparent;
            content: '';
            z-index: 2;
            }
            .chatmenu-list {
            list-style: none;
            padding: 0 1em;
            }
            .chatmenu-list li {
            font-size: 0.6em;
            white-space: nowrap;
            }
            .chatmenuLi {
            padding: 0.3em 0.5em;
            }
            .li-space-below {
            margin-bottom: 0.8em;
            }
            .chat-status-icon-small {
            height: 1.5em;
            margin-right: 0.2em;
            margin-bottom: -0.4em;
            }
            .innerClickable {
                cursor: pointer;
                color: -webkit-link;
                text-decoration: underline;
            }
            .innerClickable:hover {
            background-color: #C1CDCD;
            border-radius: 3px;
            }
            

    </style>`;

    var liveagent;
    var onlineStatus;
    class NCRChat extends HTMLElement {
        constructor() {
            super();
            console.log('New Chat object has been instantiated.');
            const shadowRoot = this.attachShadow({
                mode: 'open'
            });
            shadowRoot.appendChild(template.content.cloneNode(true));
            
            this.createSelectors();
            this.bindEventListeners();
        }

        createSelectors() {
            this.chatButton = this.shadowRoot.querySelector('#chatButton');
            this.chatModal = this.shadowRoot.querySelector('#chatMenuContainer');
            this.startChat = this.shadowRoot.querySelector('#startChat');
        }

        bindEventListeners() {
            this.chatButton.addEventListener('click', this.openChatModal.bind(this));
            this.startChat.addEventListener('click', this.openStartChat.bind(this));
        }

        connectedCallback() {

        }
        openStartChat(){
            liveagent.startChat('5730g000000PCT0');
        }
        openChatModal() {
            if (this.chatModal.style.display == "block") {
                this.chatModal.style.display = "none";
                return;
            }
            this.chatModal.style.display = "block";
            if(onlineStatus == true){
                this.shadowRoot.querySelector('#innerChatIcon').setAttribute('src', 'assets/images/Chat_Online.svg');
                this.startChat.style.display = "block";
            }else{
                this.shadowRoot.querySelector('#innerChatIcon').setAttribute('src', 'assets/images/Chat_Offline.svg');
                this.startChat.style.display = "none"; 
            }
        }
        connectedCallback() {

        }
        get status() {
            return this.getAttribute('status');
        }

        set status(value) {
            if (value) {
                this.setAttribute('status', value);
            }
        }
        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'status':
                    if (this.shadowRoot.querySelector('img') && newValue) {
                        if (newValue !== "offline") {
                            this.shadowRoot.querySelector('img').setAttribute('src', 'assets/images/Chat_Online.svg')
                            onlineStatus = true;
                        }

                    }
                    break;
            }
        }
        static get observedAttributes() {
            return ['status'];
        }
        disconnectedCallback() {
            // Disconnected means unmounting of the component
            console.log('Disconnected callback hook for any book keeping');
        }
    }

    window.customElements.define('ncr-chat', NCRChat);
})();
