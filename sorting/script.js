var cv = document.querySelector('#cv');
var c = cv.getContext('2d');
var input = document.querySelector('#algos')
var userArray = document.querySelector('#Input')
var uploadUserArray = document.querySelector('#MyArray')
var h = cv.height;
var w = cv.width;

var startingArray = [31, 27, 28, 42, 13, 8, 11, 30, 17, 41, 15, 43, 1, 36, 9, 16, 20, 35, 48, 37, 7, 26, 34, 21, 22, 6, 29, 32, 49, 10, 12, 19, 24, 38, 5, 14, 44, 40, 3, 50, 46, 25, 18, 33, 47, 4, 45, 39, 23, 2];
var copyArray = startingArray.slice(0)
var startButton = document.querySelector('#Start')
var randArray = document.querySelector('#Rand')
var randSize = document.querySelector('#RandSize')
var shuffleArr = document.querySelector('#GenerateRandom')


var n = startingArray.length
var swaps = 0
var max = -Infinity
for (var q = 0; q < n; q++) {
    if (startingArray[q] > max) { max = startingArray[q] }
}


var randArraySize = 12

startButton.addEventListener('click', () => {
    startingArray = copyArray.slice(0)
    input.value = "SA"
})
shuffleArr.addEventListener('click', () => {
    shuffle(startingArray)
    copyArray = startingArray.slice(0)
    input.value = "SA"
})
randSize.addEventListener('change', () => {
    randArraySize = randSize.value
})
randArray.addEventListener('click', () => {
    var tmpArr = []
    for (var k = 0; k < randArraySize; k++) { tmpArr.push(k + 1) }
    n = k
    shuffle(tmpArr)
    startingArray = tmpArr.slice(0)
    copyArray = startingArray.slice(0)
    max = n
    input.value = "SA"
})

var values
userArray.addEventListener('change', () => {
    values = userArray.value.split(',');
    for (var i = 0; i < values.length; i++) {
        values[i] = parseInt(values[i], 10);
    }
})
uploadUserArray.addEventListener('click', () => {
    n = values.length
    startingArray = values.slice(0)
    copyArray = values.slice(0)
    max = n
    input.value = "SA"
})

input.addEventListener('change', () => {
    switch (input.value) {
        case "Bubble Sort":
            BubbleSort(startingArray)
            break;
        case "Quick Sort":
            quickSort(startingArray, 0, n - 1)
            break;
        case "Merge Sort":
            mergeSort(startingArray, 0, n - 1)
            break;
        case "Radix Sort":
            radixBucketSort(startingArray)
            break;
        case "Insertion Sort":
            insertionSort(startingArray)
            break;
        default:
            break;
    }
})





setInterval(function () {
    c.clearRect(0, 0, w, h);

    c.lineWidth = 20;

    for (var i = 0; i < startingArray.length; i++) {
        c.fillStyle = 'black';
        c.fillRect(50 + i * (w - 100) / n, 0, (w - 100) / n - 1, startingArray[i] * 0.9 * h / max)
    }



}, 5);



//BubbleSort(startingArray)
async function BubbleSort(arr) {
    var len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                await swap(arr, j, j + 1)
            }
        }
    }
    //return arr;
}



//quickSort(startingArray, 0, n - 1);
async function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            await swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}
async function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = await partition(items, left, right);
        if (left < index - 1) {
            await quickSort(items, left, index - 1);
        }
        if (index < right) {
            await quickSort(items, index, right);
        }
    }
}



//mergeSort(startingArray, 0, n - 1)
async function merge(arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = new Array(n1);
    var R = new Array(n2);

    for (var i = 0; i < n1; ++i)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; ++j)
        R[j] = arr[m + 1 + j];

    var i = 0, j = 0;

    var k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
async function mergeSort(arr, l, r) {
    if (l < r) {
        var m = Math.floor((l + r) / 2);
        await sleep(50),
        await Promise.all([
            
            await mergeSort(arr, l, m),
            await mergeSort(arr, m + 1, r),
            await merge(arr, l, m, r)
        ])
    }
}



async function radixBucketSort(arr) {
    var idx1, idx2, idx3, len1, len2, radix, radixKey;
    var radices = {}, buckets = {}, num, curr;
    var currLen, radixStr, currBucket;

    len1 = arr.length;
    len2 = 10;  // radix sort uses ten buckets

    for (idx1 = 0; idx1 < len1; idx1++) {
        radices[arr[idx1].toString().length] = 0;
    }

    for (radix in radices) {
        len1 = arr.length;
        for (idx1 = 0; idx1 < len1; idx1++) {
            //await sleep(50)
            curr = arr[idx1];
            currLen = curr.toString().length;
            if (currLen >= radix) {
                radixKey = curr.toString()[currLen - radix];
                if (!buckets.hasOwnProperty(radixKey)) {
                    buckets[radixKey] = [];
                }
                buckets[radixKey].push(curr);
            } else {
                if (!buckets.hasOwnProperty('0')) {
                    buckets['0'] = [];
                }
                //await sleep(50)
                buckets['0'].push(curr);
            }
        }
        idx1 = 0;
        for (idx2 = 0; idx2 < len2; idx2++) {
            //await sleep(50)
            if (buckets[idx2] != null) {
                currBucket = buckets[idx2];
                len1 = currBucket.length;
                for (idx3 = 0; idx3 < len1; idx3++) {
                    await sleep(50)
                    arr[idx1++] = currBucket[idx3];
                }
            }
        }
        buckets = {};
    }
}



async function insertionSort(inputArr) {
    let length = inputArr.length;
    for (let i = 1; i < length; i++) {
        let key = inputArr[i];
        let j = i - 1;
        while (j >= 0 && inputArr[j] > key) {
            inputArr[j + 1] = inputArr[j];
            j = j - 1;
        }
        inputArr[j + 1] = key;
        await sleep(50)
    }
    // return inputArr;
};










async function swap(array, r, j) {
    await sleep(50);
    var temp = array[r];
    array[r] = array[j];
    array[j] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}