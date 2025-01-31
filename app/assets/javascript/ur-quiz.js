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
    const resultsContainer = document.getElementById("ur-results-container");

    // Categories and their associated questions
    const skills = {
        "Agile research practices": ["q1"],
        "Analysis and synthesis": ["q2"],
        "Inclusive research": ["q3"],
        "Research management, leadership and assurance": ["q4"],
        "Stakeholder relationship management": ["q5"],
        "User research methods": ["q6"],
        "User-centred practice and advocacy": ["q7"],
       
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
        overallLevel = "between Apprentice User Researcher and Junior User Researcher";
    } else if (overallAverage <= 2.5) {
        overallLevel = "Midweight User Researcher ";
    } else if (overallAverage <= 3.5) {
        overallLevel = "Senior User Researcher";
    } else {
        overallLevel = "between Lead User Researcher and Head of User Research";
    }

    // Display overall level
    const overallPanel = document.createElement("div");
    overallPanel.className = "nhsuk-panel nhsuk-panel--confirmation";
    overallPanel.innerHTML = `
        <h2 class="nhsuk-heading-m">Overall Level</h2>
        <p>Your scores indicate you are <strong>${overallLevel}</strong>.</p>
    `;
    resultsContainer.appendChild(overallPanel);

    // Create table for skill levels
    const table = document.createElement("table");
    table.className = "nhsuk-table";
    table.innerHTML = `
    <caption class="nhsuk-table__caption">Skills breakdown</caption>
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

