import express from 'express'
import bodyParser from 'body-parser'
import {executeTx, getAddress, getBalance, addContact, getContactsByKey } from '.';
const async = require('async');

const PORT = process.env.PORT || 3000
const app = express();

const wait = async (ms: number) => {
    await new Promise(resolve => setTimeout(resolve, ms));
}

app.use(bodyParser.json())

const processTransaction = async (transaction, callback) => {
    // Process the transaction logic here
    console.log('Running Tx in Queue...')
    console.log(transaction)


    // const tx = await executeTx(
    //     transaction.sig,
    //     transaction.sequenceWallet, 
    //     transaction.tokenID
    // )
    // ...
    // await wait(1000)
    // Call the callback function to signal completion
    callback();
};

const transactionQueue = async.queue(processTransaction, 1);

app.post('/transaction', (req, res) => {
    const transactionData = req.body;
    console.log(req.body)
    transactionQueue.push(transactionData, (tx, err) => {
        console.log(err)
        console.log(tx)
      if (err) {
        console.error('Error processing transaction:', err);
        res.status(500).send('Error processing transaction.');
      } else {
        console.log('Transaction processed successfully.');
        console.log(tx)
        res.status(200).send({tx: tx.transactionHash })
      }
    });
  });

app.post('/transaction', async (req: any, res: any) => {
    try{
        const tx = await executeTx(
                            req.body.sequenceWallet, 
                            req.body.sig,
                            req.body.tokenID
                        )
        res.send({tx: tx.transactionHash, status: 200})
    }catch(e){
        res.send({msg: e, status: 500})
    }
})

app.post('/addContact', async (req, res) => {
    await addContact(req.body.wallet, req.body.contact)
    res.status(200).send({contacts: await getContactsByKey(req.body.wallet)})
})

app.get('/queue/position', (req, res) => {
    const transaction = req.body;
    const transactionPosition = transactionQueue.indexOf(transaction);
    res.status(200).json({ position: transactionPosition });
});

app.listen(PORT, async () => {
    console.log(`listening on port: ${PORT}`)
    console.log(`relaying from this sequence wallet: ${await getAddress()}`)
})