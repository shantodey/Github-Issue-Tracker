const allIssuesArray=[]
const allIssues = () => {
    fetch("../shanto.json")
        .then(res => res.json())
        .then(jeson => showallissues(jeson.data))
            
};

const obj = {
    high: [
        'bg-red-500',
        'text-white',
    ],
    low: [
        'bg-slate-300',
        'text-white',
    ],
    mid: [
        'bg-yellow-500',
        'text-white',
    ]
}
// console.log(high.join());

const showallissues = (issue) => {
    const cardContainer = document.getElementById('card__container')

    for (const element of issue) {
        
        const createCard = document.createElement('div')
        createCard.className = `card border border-base-300 border-t-4 ${element.status === 'open' ? "border-t-[#00A96E]": "border-t-[#9b49f7]"} rounded-xl`
        createCard.innerHTML = `
            <div class="card-body p-4 gap-2 flex flex-col justify-between h-full">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center justify-between">
                        <img src="assets/Open-Status.png" alt="open" class="w-5 h-5"/>
                        <span class="badge ${element.priority === "high" ? obj.high.join(' ')
                : element.priority === "medium" ? obj.mid.join(' ') :
                    obj.low.join(' ') } text-[#EF4444] border-none font-semibold rounded-lg" > ${element.priority}</span >
                    </div >
                    <h2 class="card-title text-[13px]">${element.title}</h2>
                    <p class="text-[12px] text-base-content/50">${element.description}</p>
                    <div class="card-actions pb-3 border-b border-base-300">
                        ${element.labels.map(lebel => {
                        return (`
                                    <button class="btn btn-xs bg-[#feecec] text-[#EF4444] border-none rounded-full normal-case">
                                    <img src="assets/${lebel}.png" alt="">  ${lebel}
                                    </button>   
                                    `

                        )
                    })
            }
                        <button class="btn btn-xs bg-[#fff8db] text-[#D97706] border-none rounded-full normal-case">
                            <img src="assets/help.png" alt=""> HELP WANTED
                        </button>
                    </div>
                </div >
    <div>
        <p class="text-[12px] text-base-content/50">#${element.id} by ${element.author}</p>
        <p class="text-[12px] text-base-content/50">1/15/2024</p>
    </div>
            </div >
    `
        cardContainer.append(createCard)
    }
}


allIssues()