async function run() {

    let a = await eel.hello(1,2)();

    console.log(typeof a);
}

run();