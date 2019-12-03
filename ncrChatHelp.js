
(function(){
    const template = document.createElement('template');
  
      template.innerHTML = `<link rel="import" href="./ncr-chat.html">
    <div class="ncrChatSection">
        <a id="liveagent_button_online_5730g000000PCT0" class="chatbutton chatbuttonOnline hideLink"></a>
        <a id="liveagent_button_offline_5730g000000PCT0" class="chatbutton chatbuttonOffline hideLink"></a>
       <ncr-chat status="offline"></ncr-chat>
    </div>
    <style>
        .hideLink{
            display: none;
        }
    </style>`;

    var liveagent;
    var window;
    var chatStatusRefreshTimeoutInMs = 60000;
    var userAvailable = {
        userEmailID : 'ak250774@ncr.com',
        userFirstName: 'Anil',
        userLastName: 'Yadav',
        userPhone: '9953028252',
        userQlid:'AK250774',
        userFullName:'Anil Yadav'

    }
    class NCRChatHelp extends HTMLElement {
        constructor() 
        {
            super();
            const shadowRoot = this.attachShadow({
                mode: 'open'
            });
            shadowRoot.appendChild(template.content.cloneNode(true));
            this.initializeSFChatStatus();
            this.createSelectors();
        }
        createSelectors() {
            this.ncrChatTag = this.shadowRoot.querySelector('ncr-chat');
            this.chatOnlineButton = this.shadowRoot.querySelector('#liveagent_button_online_5730g000000PCT0');
            this.chatOfflineButton = this.shadowRoot.querySelector('#liveagent_button_offline_5730g000000PCT0');
        }
        
        initializeSFChatStatus(){
            const script = document.createElement('script');
            //script.src = 'https://c.la3-c2cs-dfw.salesforceliveagent.com/content/g/js/44.0/deployment.js';
            script.src = 'https://c.la4-c2cs-phx.salesforceliveagent.com/content/g/js/47.0/deployment.js';
            
            document.head.appendChild(script);
            script.onload = (() => {
                if(userAvailable)
                {
                    liveagent.addCustomDetail('Contact E-mail', userAvailable.userEmailID);
                    liveagent.addCustomDetail('First Name', userAvailable.userFirstName);
                    liveagent.addCustomDetail('Last Name', userAvailable.userLastName);
                    liveagent.addCustomDetail('Phone Number', userAvailable.userPhone);
                    liveagent.addCustomDetail('Quicklook ID', userAvailable.userQlid);
                    liveagent.addCustomDetail('RecordType ID', '0120j0000000Uji', false);
                    liveagent.findOrCreate('Contact').map('Email','Contact E-mail',true,true,true).map('FirstName','First Name',false,false,true).map('LastName','Last Name',false,false,true).map('Phone','Phone Number',false,false,true).map('Quicklook_ID__c','Quicklook ID',false,false,true).map('RecordTypeId','RecordType ID',false,false,true);
                    liveagent.findOrCreate('Contact').saveToTranscript('ContactId').showOnCreate().linkToEntity('Case','ContactId');
                    liveagent.setName(userAvailable.userFullName);
                    liveagent.setChatWindowWidth(500);
                    liveagent.setChatWindowHeight(500);
                    
                }
                this.refreshChatStatus();
            });
        }


        refreshChatStatus() {
        setTimeout(() => this.refreshChatStatus(), chatStatusRefreshTimeoutInMs);

        
        if (!window._laq) { window._laq = []; }
            window._laq.push(function(){
                liveagent.showWhenOnline('5730g000000PCT0', this.chatOnlineButton);
                liveagent.showWhenOffline('5730g000000PCT0', this.chatOfflineButton);
            });
            liveagent.addButtonEventHandler('5730g000000PCT0', (e)=>{
                if(e == liveagent.BUTTON_EVENT.BUTTON_AVAILABLE){
                    console.log(e);
                    
                    this.ncrChatTag.setAttribute('status','online');
                }else if(e == liveagent.BUTTON_EVENT.BUTTON_UNAVAILABLE){
                    console.log(e);
                    this.ncrChatTag.setAttribute('status','offline');
                }    
            });
            liveagent.init('https://d.la4-c2cs-phx.salesforceliveagent.com/chat', '5720g0000008Ppy', '00D1F0000009YUH');
            
        }
    }
    window.customElements.define('ncr-chat-help', NCRChatHelp);
})();
