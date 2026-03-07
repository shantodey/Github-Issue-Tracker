// configs for custom thing in html and css
const obj = {
    high: ['bg-[#feecec]', 'text-[#f15959]', 'uppercase'],
    low: ['bg-[#eeeff2]', 'text-[#9ca3af]', 'uppercase'],
    mid: ['bg-[#fff6d1]', 'text-[#f6a924]', 'uppercase']
}
const cardImg = {
    foropen: '<img src="assets/Open-Status.png" alt="open"/>',
    forclosed: '<img src="assets/Closed-Status.png" alt="Closed"/>'
}
const labelConfig = {
    'bug': { bg: 'bg-[#feecec]', text: 'text-[#EF4444]', border: 'border-[#EF4444]', icon: 'assets/bug.png' },
    'help wanted': { bg: 'bg-[#fff8db]', text: 'text-[#D97706]', border: 'border-[#D97706]', icon: 'assets/help wanted.png' },
    'enhancement': { bg: 'bg-[#defce8]', text: 'text-[#00a96e]', border: 'border-[#00a96e]', icon: 'assets/Enhancement.png' },
    'documentation': { bg: 'bg-[#defce8]', text: 'text-[#00a96e]', border: 'border-[#00a96e]', icon: 'assets/document.png' },
}


// arrays
const statusAll = []
const statusOpen = []
const statusClosed = []
const cardContainer = document.getElementById('card__container')


// update count
const updateCount=(target)=>{
    const allIssueCount = document.getElementById('issue__count')
    allIssueCount.innerText = `${target.length} Issues`
}


// faching data form api
const allIssues = async () => {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await response.json()
    statusAll.push(...data.data)
    statusOpen.push(...data.data.filter(el => el.status === 'open'))
    statusClosed.push(...data.data.filter(el => el.status === 'closed'))
    showallissues(statusAll)
    updateCount(statusAll)

};


// faching data form secend api for more card detels 
const issueNo = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const response = await fetch(url)
    const detels = await response.json()
    displayissueDetels(detels.data);
};


// togole button 
const buttonGrou = document.getElementById('button__group');
buttonGrou.addEventListener('click', (e) => {
    const btn = e.target.id
    cardContainer.innerHTML = '';
    const target = btn === 'open_data' ? statusOpen : btn === 'closed' ? statusClosed : statusAll;
    updateCount(target)
    for (const element of target) {
        renderdata(element)
    }
})


const showallissues = (issue) => {
    for (const element of issue) {
        renderdata(element)
    }
}
const renderdata = (element) => {
    const cardContainer = document.getElementById('card__container')
    const createCard = document.createElement('div')
    createCard.className = `card bg-white card__shadows border border-base-300 border-t-4 ${element.status === 'open' ? "border-t-[#00A96E]" : "border-t-[#9b49f7]"} rounded-xl`
    createCard.innerHTML = `
                <div onclick="issue_modal.showModal();issueNo(${element.id})" class="card-body p-4 gap-2 flex flex-col justify-between h-full">
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center justify-between">
                            ${element.status === 'open' ? cardImg.foropen : cardImg.forclosed}

                            <span class="badge ${element.priority === "high" ? obj.high.join(' ') : element.priority === "medium" ? obj.mid.join(' ') :
            obj.low.join(' ')} text-[#EF4444] border-none font-semibold rounded-lg" > ${element.priority}</span >
                        </div >
                        <h2 class="card-title font-semibold text-[19px]">${element.title}</h2>
                        <p class="text-[12px] text-base-content/50">${element.description}</p>
                        <div class="card-actions pb-3 border-b border-base-300">
                        ${element.labels.map(function (label) {
                const cfg = labelConfig[label.toLowerCase()]
                if (!cfg) return ''
                return `
                            <button class="btn btn-xs uppercase ${cfg.bg} ${cfg.text} ${cfg.border} rounded-full normal-case">
                                                    <img src="${cfg.icon}" alt="" class="w-3 h-3"/> ${label}
                                                </button>`
            }).join('')}
                        
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

// adding new card model on click
const displayissueDetels = (word) => {
    console.log(word);
    const issuebox = document.getElementById('issue_modal');
    issuebox.innerHTML = `
            <div class="modal-box">
                                <h3 class="text-xl font-bold mb-2">${word.title}</h3>
                                <div class="flex items-center gap-2 mb-4">
                                    <span class="badge ${word.status === 'open' ? "bg-[#00A96E]" : "bg-[#9b49f7]"}  text-white border-none px-3 py-2">${word.status}</span>
                                    <span class="text-sm text-base-content/50">• Opened by ${word.author} • 22/02/2026</span>
                                </div>
                                <div class="flex gap-2 mb-4">
                                    ${word.labels.map(function (label) {
        const cfg = labelConfig[label.toLowerCase()]
        if (!cfg) return ''
        return `<button class="btn btn-xs uppercase ${cfg.bg} ${cfg.text} ${cfg.border} rounded-full normal-case">
                                                <img src="${cfg.icon}" alt="" class="w-3 h-3"/> ${label}
                                            </button>`
    }).join('')}
                                </div>
                                <p class="text-sm text-base-content/70 mb-6">
                                    ${word.description}
                                </p>
                                <div class="bg-base-200 rounded-xl p-4 flex justify-between items-center mb-4">
                                    <div>
                                        <p class="text-sm text-base-content/50">Assignee:</p>
                                        <p class="font-bold">${word.assignee}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-base-content/50">Priority:</p>
                                        <span class="badge ${word.priority === "high" ? obj.high.join(' ') : word.priority === "medium" ? obj.mid.join(' ') :
            obj.low.join(' ')} text-[#EF4444] border-none font-semibold rounded-lg" > ${word.priority}</span >
                                    </div>
                                </div>
                                <div class="modal-action">
                                    <form method="dialog">
                                        <button class="btn bg-[#4a00ff] text-white border-none px-8">Close</button>
                                    </form>
                                </div>

                            </div>
        `;
};

allIssues()
document.getElementById("submitbtn").addEventListener('click', () => {
    const input = document.getElementById("inputfild")
    const searchValue = input.value.trim().toLowerCase()
    const filtered = statusAll.filter(issue =>
        issue.title.toLowerCase().includes(searchValue)
    )
    cardContainer.innerHTML = ''
    updateCount(filtered)
    filtered.forEach(element => renderdata(element))
})