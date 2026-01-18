const database = {
    "dhaka": {
        "ঢাকা": ["কমলাপুর", "বিমানবন্দর"],
        "গাজীপুর": ["জয়দেবপুর", "টঙ্গী"]
    },
    "chittagong": {
        "চট্টগ্রাম": ["চট্টগ্রাম শহর", "সীতাকুণ্ড"]
    }
};

const trainSchedules = {
    "কমলাপুর": [
        { name: "সুবর্ণ এক্সপ্রেস (৭০১)", time: "০৪:৩০ AM", to: "চট্টগ্রাম", type: "Intercity", stops: "ঢাকা, ফেনী, চট্টগ্রাম" },
        { name: "দেওয়ানগঞ্জ মেইল (৪৭)", time: "১১:৩০ PM", to: "দেওয়ানগঞ্জ", type: "Mail", stops: "ঢাকা, জয়দেবপুর, গফরগাঁও, ময়মনসিংহ" }
    ],
    "জয়দেবপুর": [
        { name: "বলাকা এক্সপ্রেস", time: "সকাল ১০:১৫", to: "ময়মনসিংহ", type: "Commuter", stops: "টঙ্গী, শ্রীপুর, গফরগাঁও" }
    ]
};

function loadDistricts() {
    const div = document.getElementById('division').value;
    const distSelect = document.getElementById('district');
    distSelect.innerHTML = '<option value="">জেলা নির্বাচন করুন</option>';
    if(div) {
        distSelect.disabled = false;
        Object.keys(database[div]).forEach(d => distSelect.innerHTML += `<option value="${d}">${d}</option>`);
    }
}

function loadStations() {
    const div = document.getElementById('division').value;
    const dist = document.getElementById('district').value;
    const stSelect = document.getElementById('station');
    stSelect.innerHTML = '<option value="">স্টেশন নির্বাচন করুন</option>';
    if(dist) {
        stSelect.disabled = false;
        database[div][dist].forEach(s => stSelect.innerHTML += `<option value="${s}">${s}</option>`);
    }
}

function getSchedule() {
    const st = document.getElementById('station').value;
    const res = document.getElementById('resultArea');
    res.innerHTML = "";
    
    if(trainSchedules[st]) {
        trainSchedules[st].forEach(t => {
            const color = t.type === 'Mail' ? '#fbbf24' : '#4ade80';
            res.innerHTML += `
                <div class="glass-card" style="margin-bottom: 20px; text-align: left;">
                    <span style="color:${color}; font-weight:bold; border: 1px solid ${color}; padding: 2px 10px; border-radius: 5px; font-size: 12px;">${t.type}</span>
                    <h2 style="margin-top:10px;">🚆 ${t.name}</h2>
                    <p style="font-size: 20px; color: #fbbf24;">⏰ ছাড়ার সময়: ${t.time}</p>
                    <p>📍 গন্তব্য: ${t.to}</p>
                    <hr style="opacity:0.2; margin:15px 0;">
                    <p style="font-size: 14px; opacity:0.8;">স্টপেজ: ${t.stops}</p>
                </div>`;
        });
    } else {
        res.innerHTML = `<div class="glass-card">❌ দুঃখিত, এই স্টেশনে কোনো মেইল বা আন্তঃনগর ট্রেনের তথ্য পাওয়া যায়নি।</div>`;
    }
}