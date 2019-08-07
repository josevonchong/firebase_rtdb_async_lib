async function write_to_rtdb_dir(path, data) {
    firebase.database().ref(path).set(data);
}

async function write_to_rtdb_random_id(path, data) {
    firebase.database().ref(path).push(data);

}

async function check_rtdb_path_if_empty(path) {
    return firebase.database().ref(path).once('value').then((snapshot) => {
        return snapshot.exists();
    })
}

async function get_rtdb_dir_children_num(path) {
    var ref = firebase.database().ref(path);
    return ref.once("value")
        .then(function (snapshot) {
            return snapshot.numChildren(); // 1 ("name")
        });
}

async function fetch_from_rtdb_path(path) {
    return firebase.database().ref(path).once('value').then(function (snapshot) {
        return snapshot.val()
    });
}

async function check_if_elem_exits_rtdb(path, dataToValidateExistence) {
    var ref = firebase.database().ref(path);
    return ref.once("value")
        .then(function (snapshot) {
            return snapshot.child(dataToValidateExistence).exists(); // true

        });
}

async function fetch_from_rtdb_and_sync_session_storage(path, cacheRef) {
    sessionStorage.clear();
    return firebase.database().ref(path).once('value').then(function (snapshot) {
        sessionStorage.setItem(cacheRef, JSON.stringify(snapshot.val()));
    });
}

async function fetch_from_rtdb_and_sync_local_storage(path, cacheRef) {
    localStorage.clear();
    return firebase.database().ref(path).once('value').then(function (snapshot) {
        localStorage.setItem(cacheRef, JSON.stringify(snapshot.val()));
    });
}

async function batch_upload_to_rtdb(path, dataArr) {
    for (let i = 0; i < dataArr.length; i++){
        firebase.database().ref(path).push(dataArr[i]);
    }
}


async function rtdb_count_children(path) {
    var ref = firebase.database().ref(path);
    return ref.once("value")
        .then(function (snapshot) {
            return snapshot.numChildren();
        });
}
