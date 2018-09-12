# Vindi Node.js SDK

[API Docs] (https://vindi.github.io/api-docs/dist) |

## Instalação

```
npm install vindi-node-sdk

```

## Configuração

Para iniciar a utilização do sdk, é necessário configurar a variável de ambiente abaixo:

#### API KEY

```
process.env.VINDI_API_KEY = 'YOUR_VINDI_API_KEY'

```
#### API URI

Por padrão, a URI base da api na versão atual (v1) já está configurada internamente ``` https://app.vindi.com.br/api/v1 ```.

Para alterar configure a seguinte variável de ambiente:

```
process.env.VINDI_API_URI = 'YOUR_VINDI_API_URI'

```

Os exemplos de configuração acima são apenas sugestão, você pode utilizar qualquer outro processo para configuração das variáveis, desde que os mesmos sejam disponibilizados para o ambiente.

## Utilização

```

Vindi.customer.all().then(data => {
    console.log(JSON.stringify(data))
}).catch(error => {
    console.log(error)
})

// output:

{
   "items":[
      {
         "id":ID,
         "name":"NAME",
         "email":"EMAIL",
         "registry_code":"REGISTRY_CODE",
         "code":"CODE",
         "notes":"NOTES",
         "status":"active",
         "created_at":"2018-05-07T15:48:14.000-03:00",
         "updated_at":"2018-05-07T16:35:35.000-03:00",
         "metadata":{
         },
         "address":{
            "street":"STREET",
            "number":"NUMBER",
            "additional_details":"ADDITIONAL_DETAIL",
            "zipcode":"ZIPCODE",
            "neighborhood":"NEIGHBORHOOD",
            "city":"CITY",
            "state":"BA",
            "country":"BR"
         },
         "phones":[
         ]
      },
      ...
   ],
   "links":{
      "first":null,
      "last":null,
      "prev":null,
      "next":null
   },
   "perPage":"25",
   "total":"200",
   "rates":{
      "limit":"120",
      "remaining":"119",
      "reset":"1536760995"
   }
}

```
## Filtros, Paginação e Ordenação

Os parâmetros aceitos para filtros e paginação, bem como as exigências sobre os formatos e codificação são descritos [aqui](https://atendimento.vindi.com.br/hc/pt-br/articles/204163150)

Este SDK foi desenvolvido de modo a atender o padrão atual da API Vindi. 

### Paginação e Ordenação

Cada recurso da API, possui atributos para busca/ordenação distintos, estes podem ser consultados na [documentação](https://vindi.github.io/api-docs/dist) de consultas GET dos mesmos.

A utilização de propriedades inválidas neste processo, fará com que a requisição retorne um erro (verifique o ``` .catch ``` abaixo).

```
const params = {
    per_page: 1,
    sort_by: 'name'
}

Vindi.plan.all(params).then(data => {
    console.log(JSON.stringify(data))
}).catch(error => {
    console.log(error)
})

```

Em caso de sucesso, o SDK formatará as respostas de modo que a saída siga sempre o padrão estrutural exibido na seção [Utilização](#utilização).

### Filtros

Para utilização do filtros da API Vindi, é necessário compreender as seguintes regras:

1. Os parâmetros de filtragem devem ser inseridos na chave ``` query ``` da querystring (URL).
2. Os parâmetros devem ser codificados de acordo com o padrão [URL Encoded](https://pt.wikipedia.org/wiki/Codifica%C3%A7%C3%A3o_por_cento)
3. Deve-se utilizar a simbologia de consulta aceita e descrita na documentação.

O SDK disponibiliza um recurso próprio para formatação e codificação dos parâmetros de filtragem.

```
const f = Vindi.filter

f.where('name:Mensal')

const params = {
    sort_by: 'name',
    query: f.get()
}

Vindi.plan.all(params).then(data => {
    console.log(JSON.stringify(data))
}).catch(error => {
    console.log(error)
})

```

Esta funcionalidade permite que você adicione vários argumentos sequencialmente no método ``` where ```. Estes serão entendidos por padrão como ``` AND ```

```
f.where(
    'name:Mensal',
    'interval_count>=2'
)

// Utilize este método para obter a consulta explícita.
console.log(f.get())

const params = {
    sort_by: 'name',
    query: f.get()
}

```

Caso necessite utilizar mais parâmetros de forma estratégica, utilize os métodos avançados, disponíveis no filtro.

```
f.where(
    f.and(
        f.or('name:Mensal', f.gte('interval_count', 2)),
        f.or('status=active', 'billing_trigger_day=2')
    )
)
```

Negação

```
f.where(
    f.not('status=inactive')
)
```

#### ATENÇÃO
O SDK NÃO está configurado de modo a prevenir o uso sequencial incorreto dos métodos de filtragem, deste modo é recomendável sempre depurar ``` console.log(f.get()) ``` a string de busca resultante para garantir que os resultados obtidos são realmente os desejados.

### Métodos disponíveis no filtro:

```
f.eq(x, y)      // x=y
f.like(x, y)    // x:y
f.not(x)        // -x
f.lt(x, y)      // x<y
f.lte(x, y)     // x<=y
f.gt(x, y)      // x>y
f.gte(x, y)     // x>=y
f.and(...args)  // arg1 AND arg2 AND arg3 ....
f.and(...args)  // arg1 OR arg2 OR arg3 ....
f.get()         // x=1 AND y=2
```

## Status dos recursos

[x] Disponível | [ ] Indisponível

|   Recurso	                            |   Status	|
|---	                                |---	    |
|   Vindi.bill.all(params)	            |   [x]	    |
|   Vindi.bill.create(data)             |   [x]	    |
|   Vindi.bill.retrieve(id)             |   [x]	    |
|   Vindi.bill.update(id, data)         |   [x]	    |
|   Vindi.bill.delete(id)               |   [x]	    |
|   Vindi.bill.approve(id)              |   [x]	    |
|   Vindi.bill.change(id)               |   [x]	    |
|   Vindi.bill.invoice(id)              |   [x]	    |
|---                                    |---        |
|   Vindi.billItem.retrieve(id)         |   [x]	    |
|---                                    |---        |
|   Vindi.charge.all(params)	        |   [x]	    |
|   Vindi.charge.retrieve(id)	        |   [x]	    |
|   Vindi.charge.update(id, data)	    |   [x]	    |
|   Vindi.charge.delete(id)	            |   [x]	    |
|   Vindi.charge.charge(id)	            |   [x]	    |
|   Vindi.charge.fraudReview(id)	    |   [x]	    |
|   Vindi.charge.refund(id)	            |   [x]	    |
|   Vindi.charge.reissue(id)	        |   [x]	    |
|---                                    |---        |
|   Vindi.customer.all(params)	        |   [x]	    |
|   Vindi.customer.create(data)	        |   [x]	    |
|   Vindi.customer.retrieve(id)	        |   [x]	    |
|   Vindi.customer.update(id, data)	    |   [x]	    |
|   Vindi.customer.delete(ud)   	    |   [x]	    |
|   Vindi.customer.unarchive(id)	    |   [x]	    |
|---                                    |---        |
|   Vindi.discount.create()	            |   [x]	    |
|   Vindi.discount.retrieve(id)	        |   [x]	    |
|   Vindi.discount.delete(id)	        |   [x]	    |
|---                                    |---        |
|   Vindi.importBatch.all(params)	    |   [ ]	    |
|   Vindi.importBatch.upload(data)	    |   [ ]	    |
|   Vindi.importBatch.retrieve(id)	    |   [ ]	    |
|---                                    |---        |
|   Vindi.invoice.all(params)	        |   [x]	    |
|   Vindi.invoice.create(data)	        |   [x]	    |
|   Vindi.invoice.retrieve(id)	        |   [x]	    |
|   Vindi.invoice.update(id)	        |   [x]	    |
|   Vindi.invoice.delete(id)	        |   [x]	    |
|   Vindi.invoice.retry(id)	            |   [x]	    |
|---                                    |---        |
|   Vindi.issue.all(params)	            |   [x]	    |
|   Vindi.issue.retrieve(id)	        |   [x]	    |
|   Vindi.issue.update(id)	            |   [x]	    |
|---                                    |---        |
|   Vindi.merchant.all(params)	        |   [x]	    |
|   Vindi.merchant.current()	        |   [x]	    |
|   Vindi.merchant.retrieve(id)	        |   [x]	    |
|---                                    |---        |
|   Vindi.merchantUser.all(params)	    |   [ ]	    |
|   Vindi.merchantUser.create(data)	    |   [ ]	    |
|   Vindi.merchantUser.retrieve(id)	    |   [ ]	    |
|   Vindi.merchantUser.update(id, data) |   [ ]	    |
|   Vindi.merchantUser.delete(id)	    |   [ ]	    |
|   Vindi.merchantUser.reactivate(id)   |   [ ]	    |
|---                                    |---        |
|   Vindi.message.all(params)	        |   [x]	    |
|   Vindi.message.retrieve(id)	        |   [x]	    |
|   Vindi.message.send(data)            |   [x]	    |
|---                                    |---        |
|   Vindi.movements.create(data)        |   [ ]	    |
|---                                    |---        |
|   Vindi.notification.all(params)	            |   [x]	    |
|   Vindi.notification.create(data)	            |   [x]	    |
|   Vindi.notification.retrieve(id)	            |   [x]	    |
|   Vindi.notification.update(id, data)         |   [x]	    |
|   Vindi.notification.delete(id)               |   [x]	    |
|   Vindi.notification.getItems(id)             |   [x]	    |
|   Vindi.notification.addItem(id, data)        |   [x]	    |
|   Vindi.notification.removeItem(id, itemId)   |   [x]	    |
|---                                            |---        |
|   Vindi.paymentMethod.all(params)	    |   [x]	    |
|   Vindi.paymentMethod.retrieve(id)    |   [x]	    |
|---                                    |---        |
|   Vindi.paymentProfile.all(params)    |   [x]	    |
|   Vindi.paymentProfile.create(data)   |   [x]	    |
|   Vindi.paymentProfile.retrieve(id)   |   [x]	    |
|   Vindi.paymentProfile.delete(id)     |   [x]	    |
|   Vindi.paymentProfile.verify(id)     |   [x]	    |
|---                                    |---        |
|   Vindi.period.all(params)            |   [x]	    |
|   Vindi.period.retrieve(id)           |   [x]	    |
|   Vindi.period.update(id, data)       |   [x]	    |
|   Vindi.period.bill(id)               |   [x]	    |
|---                                    |---        |
|   Vindi.plan.all(params)              |   [x]	    |
|   Vindi.plan.create(data)             |   [x]	    |
|   Vindi.plan.retrieve(id)             |   [x]	    |
|   Vindi.plan.update(id, data)         |   [x]	    |
|---                                    |---        |
|   Vindi.product.all(params)           |   [x]	    |
|   Vindi.product.create(data)          |   [x]	    |
|   Vindi.product.retrieve(id)          |   [x]	    |
|   Vindi.product.update(id, data)      |   [x]	    |
|---                                    |---        |
|   Vindi.productItem.create(data)      |   [x]	    |
|   Vindi.productItem.retrieve(id)      |   [x]	    |
|   Vindi.productItem.update(id, data)  |   [x]	    |
|   Vindi.productItem.delete(id)        |   [x]	    |
|---                                    |---        |
|   Vindi.public.profilePayment(data)   |   [ ]	    |
|---                                    |---        |
|   Vindi.roles.all(params)             |   [ ]	    |
|---                                    |---        |
|   Vindi.subscription.all(params)      |   [x]	    |
|   Vindi.subscription.create(data)     |   [x]	    |
|   Vindi.subscription.retrieve(id)     |   [x]	    |
|   Vindi.subscription.update(id, data) |   [x]	    |
|   Vindi.subscription.delete(id)       |   [x]	    |
|   Vindi.subscription.renew(id)        |   [x]	    |
|   Vindi.subscription.reactivate(id)   |   [x]	    |
|---                                    |---        |
|   Vindi.transaction.all(params)       |   [x]	    |
|   Vindi.transaction.create(data)      |   [x]	    |
|   Vindi.transaction.retrieve(id)      |   [x]	    |
|   Vindi.transaction.update(id, data)  |   [x]	    |
|---                                    |---        |
|   Vindi.usage.create(data)            |   [ ]	    |
|   Vindi.usage.delete(id)              |   [ ]	    |
|---                                    |---        |
|   Vindi.user.current()                |   [x]	    |
|---                                    |---        |
