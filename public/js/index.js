//run index.js once DOM is loaded and ready to use

$(document).ready(function () {

    //post req for generating link
    $(".getLink").on("click", function () {

        $(".feedback").attr('hidden', true);

        $("#short-url").val("generating link please wait...");

        var longUrl = $("#long-url").val();

        $.post("/", { long_url: longUrl }, function (data, status) {

            if (status === "success") {
                if (data.valid === 1) {
                    $("#short-url").val(data.short_url);

                    $(".op-text-box").addClass("output");
                    setTimeout(function () {
                        $(".op-text-box").removeClass("output");
                    }, 600);
                }
                else if (data.valid === 0) {
                    $(".feedback").removeAttr('hidden');
                    $("#short-url").val("https://short-url.com");
                }
                else {
                    alert("Server Problem. Please try again.");
                    $("#short-url").val("https://short-url.com");
                }
            }
            else {
                alert("Server Problem. Please try again.");
                $("#short-url").val("https://short-url.com");
            }

        });

    });



    // clipboard tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });


    // copy to clipboard
    $(".copy").on("click", function () {
        var shortUrl = $("#short-url").val();
        navigator.clipboard.writeText(shortUrl);
    });


    // Social media 
    const waBtn = $(".wa");
    const fbBtn = $(".fb");
    const twBtn = $(".tw");
    const liBtn = $(".li");
    const rdBtn = $(".rd");

    let postUrl = encodeURI(document.location.href);
    let postTitle = encodeURI("Hey Everyone! Check this out.");
    let waTitle = encodeURI("Hey! Check this out. ");

    fbBtn.attr("href", `https://www.facebook.com/sharer.php?u=${postUrl}`);
    waBtn.attr("href", `https://wa.me/?text=${waTitle}${postUrl}`);
    liBtn.attr("href", `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`);
    twBtn.attr("href", `https://twitter.com/share?url=${postUrl}&text=${postTitle}`);
    rdBtn.attr("href", `https://reddit.com/submit?url=${postUrl}&title=${postTitle}`);


    
});



