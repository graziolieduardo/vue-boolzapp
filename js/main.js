Vue.config.devtools = true;
const app = new Vue({
    el: '#root',
    data: { 
        search: '',
        message: '',
        activeContact: "",
        activeMessage: null,
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '01/10/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '01/10/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '01/10/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '03/20/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '03/20/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '03/20/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '03/28/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '03/28/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '03/28/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '01/10/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '01/10/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ]
    }, 
    methods: {
        getActiveContact(e,i) {
            this.activeContact = this.contacts[i];
        },
        sendMessage() {
            if(this.message != '') {
                this.activeContact.messages.push(
                    {
                        date: this.getTime(),
                        message: this.message,
                        status: 'sent'
                    }
                );
                this.message = '';
                setTimeout(this.automaticAnswer, 2000);
            }

            this.updateContactList();
        },
        automaticAnswer() {
            this.activeContact.messages.push(
                {
                    date: this.getTime(),
                    message: 'Ok',
                    status: 'received'
                }
            );
        },
        getTime() {
            return dayjs().format('MM/DD/YYYY hh:mm:ss')
        },
        searchContact() {
            this.contacts.forEach((element) => {
                let upperSearch = this.search.toUpperCase();
                let upperEl = element.name.toUpperCase()
                if (upperSearch == '') {
                    element.visible = true;
                } else if (!upperEl.startsWith(upperSearch))
                  /*else if (!upperEl.includes(upperSearch))*/ {
                    element.visible = false;
                } else {
                    element.visible = true;
                }
            }); 
        },
        openDropdownMenu(index) {
            if(this.activeMessage != index) {
                this.activeMessage = index
            }
            else {
                this.activeMessage = null;  
            }
           
            // vanilla JS
            // let dropMenu = e.target.nextElementSibling;
            // dropMenu.classList.toggle('show')
        },
        deleteMsg(index) {
            this.activeContact.messages.splice(index, 1);
            if (this.activeContact.messages.length == 0)
                this.activeContact.visible = false;

            for (let i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].visible == true && this.activeContact.messages.length == 0)
                    return this.activeContact = this.contacts[i];
            }
            this.updateContactList();
        },
        closeDropdownMenu() {
            this.activeMessage = null;
        },
        updateContactList() {
            let lastDateUnix = 0;
            let index = 0;
            let contactLastMsg = '';
            for (let i = 0; i < this.contacts.length; i++) {
                for (let j = 0; j < this.contacts[i].messages.length; j++){
                    let message = this.contacts[i].messages[j];
                    if (lastDateUnix < dayjs(message['date']).unix()) {
                        lastDateUnix = dayjs(message['date']).unix()
                        index = i;
                        contactLastMsg = this.contacts[i];
                    }
                }
            }
            this.contacts.splice(index, 1);
            this.contacts.splice(0, 0, contactLastMsg);
        }
    },
    created() {
        this.updateContactList();
    },
    mounted() {
        this.activeContact = this.contacts[0];    
    }
});



