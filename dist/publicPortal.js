"use strict";
function reportPost() {
    let reportReason = document.querySelector('input[name="report"]:checked').value;
    if (reportReason === null) {
        return;
    }
    if (reportReason === "Other") {
        reportReason = document.querySelector('#other-report').value;
        if (reportReason.trim().length === 0) {
            alert("Reason is required if 'Other' option is selected");
            return;
        }
    }
    let reportBody = JSON.stringify({ reason: reportReason });
    console.log(reportBody);
    fetch('/api/v1/posts/report/' + window.location.pathname.split("/").pop(), {
        method: 'POST',
        body: reportBody,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => {
        if (resp.ok) {
            alert("Post Reporting Successful!");
            window.location.href = "/";
        }
        else {
            alert("Error: The post could not be reported");
            console.log("post reporting error:", resp.status, resp.statusText);
        }
    }).catch(error => {
        alert("Error: The post could not be reported");
        console.log(error);
    });
}
function showPopup() {
    document.querySelector(".popup").style.display = 'flex';
}
function hidePopup() {
    document.querySelector(".popup").style.display = 'none';
}
function attachPublicPortalListeners() {
    let reportBtn = document.querySelector("#report");
    let submitBtn = document.querySelector("#submit");
    let cancelBtn = document.querySelector("#cancel");
    reportBtn === null || reportBtn === void 0 ? void 0 : reportBtn.addEventListener("click", showPopup);
    submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", reportPost);
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.addEventListener("click", hidePopup);
}
attachPublicPortalListeners();
