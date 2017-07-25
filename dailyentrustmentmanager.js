function bindUploadDailyEntrustmentEvent() {
    $(document).on('click', '.data-upload-action', function () {
        uploadDailyEntrustmentDataFile(this);
    });

    $(document).on('click', '.file-remove-action', function () {
        removeChooseFile(this);
    });
}

function uploadDailyEntrustmentDataFile(obj) {
    var fileInputObj = $(obj).parent().find('.trading-order-upload');
    if (fileInputObj.val() == '') {
        window.wxc.xcConfirm("请选择一个正确的数据文件", window.wxc.xcConfirm.typeEnum.error);
    }
    else {
        $('.bg').fadeIn(200);
        $('.loadingcontent').fadeIn(400);
        var formData = new FormData();
        formData.append('resourcetype', fileInputObj.data('resourcetype'));
        formData.append('filename', fileInputObj[0].files[0]);
        $.ajax({
            url: "/Stock/UploadDailyEntrustmentDataFile",
            data: formData,
            type: "POST",
            cache: false,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data == 'success') {
                    $('.bg').fadeOut(800);
                    $('.loadingcontent').fadeOut(800);
                    window.wxc.xcConfirm("上传成功", window.wxc.xcConfirm.typeEnum.success);
                    removeChooseFile(obj);
                }
                else if (data == 'failed') {
                    $('.bg').fadeOut(800);
                    $('.loadingcontent').fadeOut(800);
                    window.wxc.xcConfirm("上传失败，重复数据", window.wxc.xcConfirm.typeEnum.error);
                    removeChooseFile(obj);
                }
                else if (data == 'errorNull') {
                    $('.bg').fadeOut(800);
                    $('.loadingcontent').fadeOut(800);
                    window.wxc.xcConfirm("上传失败，文件为空", window.wxc.xcConfirm.typeEnum.error);
                    removeChooseFile(obj);
                }
                else if (data == 'errorWrongHTDataFile') {
                    $('.bg').fadeOut(800);
                    $('.loadingcontent').fadeOut(800);
                    window.wxc.xcConfirm("上传失败，请选择正确的海通证券当日委托文件", window.wxc.xcConfirm.typeEnum.error);
                    removeChooseFile(obj);
                }
                else if (data == 'errorWrongZSDataFile') {
                    $('.bg').fadeOut(800);
                    $('.loadingcontent').fadeOut(800);
                    window.wxc.xcConfirm("上传失败，请选择正确的招商证券当日委托文件", window.wxc.xcConfirm.typeEnum.error);
                    removeChooseFile(obj);
                }
                else if (data == 'missStock') {
                    $('.bg').fadeOut(800);
                    $('.loadingcontent').fadeOut(800);
                    window.wxc.xcConfirm("上传失败，无持股记录", window.wxc.xcConfirm.typeEnum.error);
                    removeChooseFile(obj);
                }
                else {
                    $('.bg').fadeOut(800);
                    $('.loadingcontent').fadeOut(800);
                    alert(data);
                    removeChooseFile(obj);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('.bg').fadeOut(800);
                $('.loadingcontent').fadeOut(800);
                alert("Upload daily entrustment data file error! status:" + XMLHttpRequest.status + " readyState:" + XMLHttpRequest.readyState + " textStatus:" + textStatus);
            }
        });
    }
}

function removeChooseFile(obj) {
    $(obj).parent().find('.trading-order-upload').val('');
}