function setInputTypeAccepted() {

    var inputFormat = $('#input_format').val();

    $('#mut_bulk').attr('accept', '.' + inputFormat);
    $('#bg_bulk').attr('accept', '.' + inputFormat);

    if (inputFormat == 'bam') {
        $('#bulkvcf').show();
    } else {
        $('#bulkvcf').hide();
        $('#bulkvcf').find('input').val("");
    }

}


$('#input_format').on('change', function () {
    setInputTypeAccepted();
});


$(function () {
    setInputTypeAccepted();
});
