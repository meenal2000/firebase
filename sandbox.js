const list = document.querySelector('ul');
const form = document.querySelector('form');
// this is an asynchronous task 
// hence , it will take some time to complete and it will return a promise 
const addRecipe = (recipe,id) => {
    let html = `
    <li data-id="${id}" >
    <div>${recipe.title}</div>
    <div>${recipe.created_at.toDate()}</ div>
    <button class = 'btn btn-danger btn-sm my-2'>delete</button>
    </li>
    `;
    list.innerHTML += html;
};
db.collection('recipes').get().then((snapshot) => {
    // when we have data as a response
    // snapshot will have the snapshot of the collection (how it looks like at that time)
    //console.log(snapshot.docs[0].data());
    snapshot.docs.forEach( doc => {
        //console.log(doc.data());
        addRecipe(doc.data(),doc.id);
    });
}).catch( (err) => {
    console.log(err);
});

// add documents from front-end to back-end
form.addEventListener('submit' , e => {
    e.preventDefault();
    const now = new Date();
    const recipe = {
        title : form.recipe.value,
        created_at : firebase.firestore.Timestamp.fromDate(now)
    };
    db.collection('recipes').add(recipe).then( () => {
        console.log('recipe has been added');
    }).catch( (err) => {
        console.log(err);
    });
});

// delete data
list.addEventListener('click' , e => {
    console.log(e);
    if(e.target.tagName === 'BUTTON')
    {
        const id = e.target.parentElement.parentElement.getAttribute('data-id');
        console.log(id);
        db.collection('recipes').doc(id).delete().then( () => {
            console.log('recipe deleted');
        });
        // .catch(
        //     err => { console.log(err) }
        // );
    }
   
});
