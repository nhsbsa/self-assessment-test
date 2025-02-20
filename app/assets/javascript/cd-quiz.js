//Script 1
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const questionName = form.getAttribute("id"); // Get the form's ID 
    
    form.addEventListener("submit", function () {
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        if (selectedOption) {
            sessionStorage.setItem(questionName, selectedOption.value);
        }
    });
});

//Script 2
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve all stored answers from sessionStorage
    const totalQuestions = 7;
    const resultsContainer = document.getElementById("cd-results-container");

    // Categories and their associated questions
    const skills = {
        "Agile working": ["q1", "q2"],
        "Content concepts and prototyping": ["q3"],
        "Stakeholder relationship management ": ["q4"],
        " Strategic thinking ": ["q5"],
        "User focus ": ["q6"],
        "User-centred content design": ["q7"],
       
    };

    // Result summaries for each skill
    const skillSummaries = {};
    let overallScore = 0;
    let totalSkillCount = 0;

    // Calculate scores for each skill
    for (const skill in skills) {
        const questions = skills[skill];
        let score = 0;

        questions.forEach((question) => {
            const answer = sessionStorage.getItem(question);
            if (answer) {
                // Assign point values based on answer
                switch (answer) {
                    case "apprentice-jnr":
                        score += 1;
                        break;
                    case "mid":
                        score += 2;
                        break;
                    case "snr":
                        score += 3;
                        break;
                    case "lead-head":
                        score += 4;
                        break;
                }
            }
        });

        // Store results for this skill
        const average = score / questions.length;
        overallScore += average;
        totalSkillCount += 1;

        let level;
        if (average <= 1.5) {
            level = "Apprentice - Junior";
        } else if (average <= 2.5) {
            level = "Midweight";
        } else if (average <= 3.5) {
            level = "Senior";
        } else {
            level = "Lead";
        }

        skillSummaries[skill] = level;
    }

    // Calculate overall level
    const overallAverage = overallScore / totalSkillCount;
    let overallLevel;
    if (overallAverage <= 1.5) {
        overallLevel = "an Apprentice or Junior Content Designer";
    } else if (overallAverage <= 2.5) {
        overallLevel = "a Midweight Content Designer";
    } else if (overallAverage <= 3.5) {
        overallLevel = "a Senior Content Designer";
    } else {
        overallLevel = "a Lead Content Designer or Head of Content Design ";
    }

    // Display overall level
    const overallPanel = document.createElement("div");
    overallPanel.className = "nhsuk-panel nhsuk-panel--confirmation";
    overallPanel.innerHTML = `
        
        <p>Your scores indicate your skills may be aligned with <strong>${overallLevel}</strong>.</p>
    `;
    resultsContainer.appendChild(overallPanel);

    // Create table for skill levels
    const table = document.createElement("table");
    table.className = "nhsuk-table";
    table.innerHTML = `
    <caption class="nhsuk-table__caption nhsuk-u-visually-hidden">Skills breakdown</caption>
        <thead>
            <tr>
                <th>Skill</th>
                <th>Level</th>
            </tr>
        </thead>
        <tbody>
            ${Object.entries(skillSummaries)
                .map(
                    ([skill, level]) => `
                <tr>
                    <td>${skill}</td>
                    <td>${level}</td>
                </tr>
            `
                )
                .join("")}
        </tbody>
    `;
    resultsContainer.appendChild(table);

    // Retake quiz button
    document.getElementById("retake-quiz").addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "/cd/q1";
    });
});

