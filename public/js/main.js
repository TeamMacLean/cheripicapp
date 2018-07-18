function setInputTypeAccepted() {

    var inputFormat = $('#input_format').val();
    var bulkVCF = $('#bulkvcf');

    $('#mut_bulk').attr('accept', '.' + inputFormat);
    $('#bg_bulk').attr('accept', '.' + inputFormat);

    if (inputFormat === 'bam') {
        bulkVCF.show();
    } else {
        bulkVCF.hide();
        bulkVCF.find('input').val("");
    }

}


$('#input_format').on('change', function () {
    setInputTypeAccepted();
});

$(function () {
    setInputTypeAccepted();
});
