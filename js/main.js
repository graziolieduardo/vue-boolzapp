Vue.config.devtools = true;
const app = new Vue({
    el: '#root',
    data: {
        message: '',
        activeContact: "",
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ]
    }, 
    methods: {
        getActiveContact(e) {
            let index = parseInt(e.target.dataset.contact);
            this.activeContact = this.contacts[index];
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
            return ( '0' + dayjs().date()).slice(-2) + '/' + ('0' + (dayjs().month() + 1)).slice(-2) + '/' + dayjs().year() + ' ' + ( '0' + dayjs().hour()).slice(-2) + ':' + ( '0' + dayjs().minute()).slice(-2) + ':' + ('0' + dayjs().second()).slice(-2);
       }
    }
});
