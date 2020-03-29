var app = new Vue({
    el: '#app',
    data: function () {
        return {
            certs: [],
            gist: 'https://gist.githubusercontent.com/fengkx/32278de43b1c11c99c62b3e87d9eb5db/raw/04e4a0c24f1f4cc5e62a9bc62fdfcdd938aea2f5/cert_status.json',
        }
    },
    async created() {
        const resp = await fetch(this.gist);
        try {
            const certs = await resp.json();
            this.certs = certs;
        } catch (e) {
            alert('Network error' + e.message);
        }
    },
    methods: {
        objectToKVStr: function(object) {
            return Object.keys(object).reduce((acc, cur) => {
                acc += `${cur}=${object[cur]};` + ' ';
                return acc
            }, '');
        }
    },
    computed: {
        cCerts: function() {
            const now = Date.now();
            return this.certs.map(cert => {
                const result = {...cert};
                result.last_check = (new Date(cert.last_check)).toLocaleString();
                result.site = new URL(result.site).host;
                if(result.issuer) {
                    result.issuer = this.objectToKVStr(result.issuer);
                }
                if(result.subject) {
                    result.subject = this.objectToKVStr(result.subject);
                }
                result.expired = result.valid_to < now || result.valid_from > now;
                if(!result.expired) {
                    result.remain = Math.floor((new Date(result.valid_to) - now) / 1000 / (3600*24))
                }
                return result
            })
        }
    }
});