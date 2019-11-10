const hbFrameId = 'hs-form-iframe-0';
const hbFormId = 'hsForm_' + hubspot_form_id;
const btnClass = 'hs-button primary';

function customForm() {
    var iframe = document.getElementById(hbFrameId);
    var elmnt = iframe.contentWindow.document.getElementsByClassName(btnClass)[0];
    elmnt.type = 'button';
    $(elmnt).attr('onClick', 'parent.submitForm()');
}
function submitForm() {
    var iframe = document.getElementById(hbFrameId);
    var frm = iframe.contentWindow.document.getElementById(hbFormId);
    var dataJson = $(frm).serializeArray();
    var data = new FormData($(frm)[0]);
    var blankField = dataJson.filter((d) => {
        var elem = iframe.contentWindow.document.getElementsByName(d.name)[0];
        return !d.value && elem.hasAttribute('required');
    });
    console.log("blankField == ", blankField);
    var uemail = dataJson.filter((d) => { return d.name == 'email' });
    if (blankField.length == 0) {
        $('#loading').show();
        $.ajax({
            type: $(frm).attr('method'),
            url: $(frm).attr('action'),
            cache: false,
            contentType: false,
            processData: false,
            data: data, //JSON.stringify({ fields: (data) }),
            success: function (response) {
                console.log('Submission was successful.');
                hsform(0, uemail[0].value);
            },
            error: function (error) {
                console.log('An error occurred.');
            },
        });

    } else {
        $(frm).submit();
    }
}
function hsform(i, email) {
    $.ajax({
        type: "GET",
        url: "https://hsform.herokuapp.com/api/getUrl/" + email,
        // url: "/api/getUrl/" + email,
        success: (data) => {
            console.log('Assignment initiated');
            var redirectUrl = data.redirectUrl;
            if (i < 50) {
                if (redirectUrl) {
                    console.log('Assignment was successful');
                    window.location.href = redirectUrl;
                } else {
                    setTimeout(() => {
                        console.log("==>", i);
                        hsform(++i, email);
                    }, 5000);
                }
            } else {
                // $(".loader").html("Some Error Occured. Please try after sometime");
            }
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        },
    });
}