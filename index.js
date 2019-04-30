var hotStations = ["新街口", "南京南站", "南京站", "鸡鸣寺", "夫子庙", "三山街", "苜蓿园", "大行宫", "珠江路", "云锦路"];
var navInfo = [{
        "name": "票卡分析",
        "icon": "../images/card_analysis.png",
        "bgColor": "#edb338"
    },
    {
        "name": "线网查询",
        "icon": "../images/line_search.png",
        "bgColor": "#31aeb0"
    },
    {
        "name": "站内导航",
        "icon": "../images/in_station_nav.png",
        "bgColor": "#b770ac"
    },
    {
        "name": "周边信息",
        "icon": "../images/info_around.png",
        "bgColor": "#e17265"
    },
    {
        "name": "公告须知",
        "icon": "../images/announcement.png",
        "bgColor": "#875ad9"
    },
    {
        "name": "列车时刻表",
        "icon": "../images/metro_schedule.png",
        "bgColor": "#edb338"
    }
]

$(document).ready(function () {
    initHotStations();
    initNavView();
    setScroll();
    setRuntimeScroll();
});

function initHotStations() {
    for (var i = 0; i < hotStations.length; i++) {
        var stationHtml = '<span class="station">' + hotStations[i] + '</span>';
        $(".stations-wrapper").append(stationHtml);
    }
}

// 初始化导航信息界面
function initNavView() {
    var liPageSize = 5; //一页显示个数
    var liW = $(".nav-container").width() / liPageSize;
    for (var i = 0; i < navInfo.length; i++) {
        var info = navInfo[i];
        var li = $(getNavLiHtml());
        var item = li.find(".nav-item");
        li.width(liW);
        item.css({
            "background-image": "url(" + info.icon + ")",
            "background-color": info.bgColor
        });
        li.find(".item-name").html(info.name);
        $(".nav-container ul").append(li[0]);
    }
    $(".nav-container ul li").bind("click", clickNavItem);
}

// 获取导航html
function getNavLiHtml() {
    return '<li><div class="nav-item">' +
        '<div class="item-name"></div>' +
        '</div></li>';
}

// 设置滚动
function setScroll() {
    $(".nav-container").Scroll({
        line: 1,
        speed: 500,
        direction: 1,
        increaseBtn: "#next",
        decreaseBtn: "#pre"
    }, function (status) {
        if (status.canIncrease) {
            $("#next").removeClass("disabled");
        } else {
            $("#next").addClass("disabled");
        }
        if (status.canDecrease) {
            $("#pre").removeClass("disabled");
        } else {
            $("#pre").addClass("disabled");
        }
    });
}

// 点击导航目录
function clickNavItem(e) {
  var target = $(e.currentTarget);
  //console.log(target.text());
  switch (target.index()) {
    case 0:
        { // 票卡分析
        // window.location.href = "../html/puttingCard.html";
        window.external.funcSelect("CardInfo");
        //window.location.href = "../html/cardInfo.html";
        break;
       }
    case 1:
        { // 线网查询
        window.external.funcSelect("LineSearch");
        //window.location.href = "../html/lineSearch.html";
        break;
      }
    case 2:
        { // 站内导航
        window.external.funcSelect("StationNav");
        //window.location.href = "../html/stationNav.html";
        break;
      }
    case 3:
        { // 周边信息
        window.external.funcSelect("AroundInfo");
        //window.location.href = "../html/aroundInfo.html";
        break;
      }
    case 4:
        { // 公告须知
        window.external.funcSelect("Announcement");
        //window.location.href = "../html/announcement.html";
        break;
      }
  }
}

// 设置首末班车滚动
function setRuntimeScroll() {
    var runTimeItems = $(".run-time-item");
    if (runTimeItems.length > 1) {
        setInterval(function () {
            var srcIndex = $(".run-time-item.displayed").index();
            var desIndex = srcIndex + 2 > runTimeItems.length ? 0 : srcIndex + 1;
            var srcItem = $(runTimeItems[srcIndex]);
            var desItem = $(runTimeItems[desIndex]);
            srcItem.fadeOut(1000, function() {
                desItem.fadeIn(1000);
                desItem.addClass("displayed");
            });
            srcItem.removeClass("displayed");
        }, 10000);
    }
}