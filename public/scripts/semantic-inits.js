$('.message .close')
.on('click', function() {
    $(this)
    .closest('.message')
    .transition('fade')
    ;
});

$('.ui.dropdown').dropdown();

$('#changeAvatar').click((e)=>{
    e.preventDefault();
    $('.ui.modal.avatar')
    .modal('show')
;
})

$('#changeEmail').click((e)=>{
    e.preventDefault();
    $('.ui.modal.email')
    .modal('show')
;
})
$('#verify').click((e)=>{
    e.preventDefault();
    $('.ui.modal')
    .modal('show')
;
})

$('.url.example .ui.embed').embed();
