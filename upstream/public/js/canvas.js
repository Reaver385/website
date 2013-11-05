var canvas = angular.module('canvas', ['ngRoute', 'ngAnimate'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/',                     { templateUrl: '/partials/home.html', controller: 'HomeController' })
      .when('/about',                { templateUrl: '/partials/about.html', controller: 'AboutController' })
      .when('/discover',             { templateUrl: '/partials/discover.html', controller: 'DiscoverController' })
      .when('/download',             { templateUrl: '/partials/download.html', controller: 'DownloadController' })
      .when('/canvas',               { templateUrl: '/partials/canvas.html', controller: 'CanvasController' })
      .when('/canvas/packages',      { templateUrl: '/partials/packages.html', controller: 'PackageController' })
      .when('/canvas/repositories',  { templateUrl: '/partials/repositories.html', controller: 'RepositoryController' })
      .otherwise({redirectTo: '/'});

    $locationProvider
      .html5Mode(true)
      .hashPrefix('!');
  });


/*
** DIRECTIVES
*/

/*
** SERVICES
*/

canvas.service('CanvasNavigation', function($rootScope) {
  var _page = '';
  var _mode = '';

  return {
    setPage: function( page ) {
      if( page.indexOf('canvas-') == 0 ) {
        _mode = 'canvas';
      }
      else {
        _mode = 'default';
      }

      $rootScope.$broadcast('routeLoaded', { slug: page, mode: _mode });
    }
  };
});

canvas.service('Database', function($resource) {
  return {
    packages: $resource('/api/packages')
  };
});

/*
** CONTROLLERS
*/

function NavigationController($scope, CanvasNavigation) {

  $scope.sliderPaused = false;

  // configure korobar
  var korobar = $('#korobar');
  var fixed = true;

  var footer  = $('footer');

  $scope.$on('routeLoaded', function (event, args) {
    $scope.mode = args.mode;
    $scope.slug = args.slug;

    // TODO: correct korobar start position
    // HOME PAGE correction
    var start = 0;
    var ls = $('#layerslider');
    var ls_data = ls.layerSlider('data');

    if( args.slug == 'home' ) {
      start = 256;
      ls.layerSlider('start');
    }
    else {
      ls.layerSlider('stop');
    }

    if( start - $(window).scrollTop() <= 0 ) {
      korobar.css('top', 0);
      korobar.css('position', 'fixed');
      fixed = true;
    }
    else {
      korobar.css('position', 'absolute');
      korobar.css('top', start + 'px');
      fixed = false;
    }

    // pin korobar to top when it passes
    $(window).off('scroll');
    $(window).on('scroll', function () {
      if( !fixed && (korobar.offset().top - $(window).scrollTop() <= 0) ) {
        korobar.css('top', 0);
        korobar.css('position', 'fixed');
        fixed = true;
      }
      else if( fixed && $(window).scrollTop() <= start ) {
        korobar.css('position', 'absolute');
        korobar.css('top', start + 'px');
        fixed = false;
      }
    });

    // frob page-container minimum height to at least the footer top
    $('.page-container').css('min-height', ($(window).height()-footer.outerHeight()) + 'px');
  });

  $scope.pageActive = function(page) {
    return $scope.slug === page ? 'active' : '';
  };

  $scope.modeActive = function() {
    return $scope.mode;
  };

  $scope.isMode = function(mode) {
    return mode === $scope.mode;
  };
};


function HomeController($scope, CanvasNavigation) {
  $scope.data = {};

  //
  // INIT
  CanvasNavigation.setPage('home');
};

function AboutController($scope, CanvasNavigation) {
  $scope.data = {};

  //
  // INIT
  CanvasNavigation.setPage('about');

  $('#aboutdetails a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  });
};

function DiscoverController($scope, CanvasNavigation) {
  $scope.data = {};

  //
  // INIT
  CanvasNavigation.setPage('discover');
};

function DownloadController($scope, CanvasNavigation) {
  //
  // GLOBALS
  //

  $scope.downloads = [
    {
      name: 'Korora 19.1',
      version: '19.1',
      codename: 'Bruce',
      isStable: true,
      isCurrent: true,
      released: '07 Oct 2013',
      archs: [
        {
          name: 'x86_64',
          label: '64-bit (x86_64)'
        },
        {
          name: 'i686',
          label: '32-bit (i686)'
        }
      ],
      desktops: [
        {
          name: 'cinnamon',
          label: 'CINNAMON'
        },
        {
          name: 'gnome',
          label: 'GNOME'
        },
        {
          name: 'kde',
          label: 'KDE'
        },
        {
          name: 'mate',
          label: 'MATE'
        }
      ],
      links: [
        {
          arch: 'i686',
          desktop: 'cinnamon',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/19/korora-19.1-i386-cinnamon-live.iso/download', },
            { type: 'TORRENT', url: 'http://burnbit.com/download/258852/korora_19_1_i386_cinnamon_live_iso', },
          ]
        },
        {
          arch: 'i686',
          desktop: 'gnome',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/19/korora-19.1-i386-gnome-live.iso/download', },
            { type: 'TORRENT', url: 'http://burnbit.com/download/258850/korora_19_1_i386_gnome_live_iso', },
          ]
        },
        {
          arch: 'i686',
          desktop: 'kde',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/19/korora-19.1-i386-kde-live.iso/download', },
            { type: 'TORRENT', url: 'http://burnbit.com/download/258849/korora_19_1_i386_kde_live_iso', },
          ]
        },
        {
          arch: 'i686',
          desktop: 'mate',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/19/korora-19.1-i386-mate-live.iso/download', },
            { type: 'TORRENT', url: 'http://burnbit.com/download/258851/korora_19_1_i386_mate_live_iso', },
          ]
        },
        {
          arch: 'x86_64',
          desktop: 'cinnamon',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/19/korora-19.1-x86_64-cinnamon-live.iso/download', },
            { type: 'TORRENT', url: 'http://burnbit.com/download/258848/korora_19_1_x86_64_cinnamon_live_iso', },
          ]
        },
        {
          arch: 'x86_64',
          desktop: 'gnome',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/19/korora-19.1-x86_64-gnome-live.iso/download', },
            { type: 'TORRENT', url: 'http://burnbit.com/download/258845/korora_19_1_x86_64_gnome_live_iso', },
          ]
        },
        {
          arch: 'x86_64',
          desktop: 'kde',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/19/korora-19.1-x86_64-kde-live.iso/download', },
            { type: 'TORRENT', url: 'http://burnbit.com/download/258847/korora_19_1_x86_64_kde_live_iso', },
          ]
        },
        {
          arch: 'x86_64',
          desktop: 'mate',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/19/korora-19.1-x86_64-mate-live.iso/download', },
            { type: 'TORRENT', url: 'http://burnbit.com/download/258846/korora_19_1_x86_64_mate_live_iso', },
          ]
        }
      ],
      checksums: [
        {
          arch: 'i686',
          desktop: 'cinnamon',
          checksum: [
            { type: 'md5', hash: 'be8efdd7b3db9b860f399abd891d07a9' },
            { type: 'sha', hash: '0978fb4f54f306c8f476e1109f7f872c27304757' },
            { type: 'sha256', hash: 'a0f287636dc2264a2fdee4b422b518337bb6b26e3e9f1775ccbad2e5621a9e6f' },
          ]
        },
        {
          arch: 'i686',
          desktop: 'gnome',
          checksum: [
            { type: 'md5', hash: 'dc4df9822705383aeb287ce77682cf10' },
            { type: 'sha', hash: '59e9ba6b456078c65eae1adcd724b94ecc3f052d' },
            { type: 'sha256', hash: 'f8cf78c06b7ee5dd8821f08fcdbfb075ff08661ac3672a830c81458670ded214' },
          ]
        },
        {
          arch: 'i686',
          desktop: 'kde',
          checksum: [
            { type: 'md5', hash: 'd57dac081ec565fcf7d03ce87782cc28' },
            { type: 'sha', hash: '5383bf026e97b0663ddbb452a106ff9ebfae2de7' },
            { type: 'sha256', hash: '08209b346ca67b998937d41a05835f98c5a2f015c93c68b85a56bd2e6fede7b8' },
          ]
        },
        {
          arch: 'i686',
          desktop: 'mate',
          checksum: [
            { type: 'md5', hash: '5b3dc6e039a99246cea3aa1d1df834d3' },
            { type: 'sha', hash: '1e66d5083ad607446ed8850baeda8b32dbba143a' },
            { type: 'sha256', hash: 'c7728ef26cc9e75757ff99d56752c955f70494b5f2a512c2a44138d15961af23' },
          ]
        },
        {
          arch: 'x86_64',
          desktop: 'cinnamon',
          checksum: [
            { type: 'md5', hash: '25742ef9af59ebb5765e30b8a4414a0e' },
            { type: 'sha', hash: 'f0718555cca66ac417c8484e40ab876f75f7eff1' },
            { type: 'sha256', hash: 'c274d70ae0aa2ce818237b248cb0ec2c5d8f76e8b76e729856bbc35fe0a34f38' },
          ]
        },
        {
          arch: 'x86_64',
          desktop: 'gnome',
          checksum: [
            { type: 'md5', hash: 'e1cfbef695af85b9f0094ecac6d7cb67' },
            { type: 'sha', hash: '95cc4648564a4dac6538206020423ca18746fa75' },
            { type: 'sha256', hash: '698956d7af8279c32730d60887a22e3b6ffdbd2e4c9b653e0833a9065ba29d54' },
          ]
        },
        {
          arch: 'x86_64',
          desktop: 'kde',
          checksum: [
            { type: 'md5', hash: '62cc01b7cc8d111c5c80248ad3380d71' },
            { type: 'sha', hash: 'fc4d071309957cc524b7cba110ae7ab1cb0b3e09' },
            { type: 'sha256', hash: 'a30cbef47b369beac8cc7a180338a9d77b3aba812d5a630230eb38acadf11047' },
          ]
        },
        {
          arch: 'x86_64',
          desktop: 'mate',
          checksum: [
            { type: 'md5', hash: '75344ea4e67bb7454b5dc9ea4a7dc3e5' },
            { type: 'sha', hash: '683433b865d81e6920b9a0288e03161df5a39bf6' },
            { type: 'sha256', hash: '5d79b3e3a01c37f5dd80d87e894e2ed152555b6dcbdeeac425a06387c08741c2' },
          ]
        }
      ],
      available: true,
    },
    {
      name: 'Korora 18',
      version: '18',
      codename: 'Flo',
      isStable: true,
      isCurrent: true,
      released: '01 May 2013',
      archs: [
        {
          name: 'x86_64',
          label: '64-bit (x86_64)'
        },
        {
          name: 'i686',
          label: '32-bit (i686)'
        }
      ],
      desktops: [
        {
          name: 'gnome',
          label: 'GNOME'
        },
        {
          name: 'kde',
          label: 'KDE'
        }
      ],
      links: [
        {
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/18/korora-18-i386-gnome-live.iso/download', },
          ],
          arch: 'i686',
          desktop: 'gnome',
        },
        {
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/18/korora-18-i386-kde-live.iso/download', },
          ],
          arch: 'i686',
          desktop: 'kde',
        },
        {
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/18/korora-18-x86_64-gnome-live.iso/download', },
          ],
          arch: 'x86_64',
          desktop: 'gnome',
        },
        {
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaproject/files/18/korora-18-x86_64-kde-live.iso/download', },
          ],
          arch: 'x86_64',
          desktop: 'kde',
        },
      ],
      checksums: [
        {
          arch: 'i686',
          desktop: 'gnome',
          checksum: [
            { type: 'md5', hash: '6b2937fc76599c82b4f1bf5eb87fc2ed' },
            { type: 'sha', hash: '91528703cbd314ca32b42df5b064dab526199ac8' },
            { type: 'sha256', hash: '5cf1f3192cef63c8eba8bfb3f6634d15aac8b7662c1a9bc913b528f88770fa25' },
          ],
        },
        {
          arch: 'i686',
          desktop: 'kde',
          checksum: [
            { type: 'md5', hash: 'e6f31d4ff03c1c6cc79123ec1bec3107' },
            { type: 'sha', hash: '4421274f16068f5194f3e9f5b5459a9ad86efbcb' },
            { type: 'sha256', hash: 'c359d3142157d3a0c15689d9e7e00f29b7d90681474d8b5d58125475ff6470ba' },
          ],
        },
        {
          arch: 'x86_64',
          desktop: 'gnome',
          checksum: [
            { type: 'md5', hash: '35720eed9123f973d9b3590cf29670de' },
            { type: 'sha', hash: '240fef106e8da4fd932d646ee337f2a7d37bd436' },
            { type: 'sha256', hash: '226d1c7c0af6262a906dacf88cee09efb62b7f25ff47357dff9da95ef7d6d0b9' },
          ],
        },
        {
          arch: 'x86_64',
          desktop: 'kde',
          checksum: [
            { type: 'md5', hash: 'ad140e9aaa19bdf5b5d4fd369b02705a' },
            { type: 'sha', hash: '4c6df0e8e6d32aa40789e63598e41a0fc7cfbd24' },
            { type: 'sha256', hash: 'ed1caa59d2bf1f120c6392e79937b2db23fe21935ff4a6f9503760cd52979213' },
          ],
        },
      ],
      available: true,
    },
    {
      name: 'Kororaa 17',
      version: '17',
      codename: 'Bubbles',
      isStable: true,
      isCurrent: false,
      released: '16 Jul 2012',
      archs: [
        {
          name: 'x86_64',
          label: '64-bit (x86_64)'
        },
        {
          name: 'i686',
          label: '32-bit (i686)'
        }
      ],
      desktops: [
        {
          name: 'gnome',
          label: 'GNOME'
        },
        {
          name: 'kde',
          label: 'KDE'
        }
      ],
      links: [
        {
          arch: 'i686',
          desktop: 'gnome',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaa/files/17/Kororaa-17-i686-Live-GNOME.iso/download', },
          ],
        },
        {
          arch: 'i686',
          desktop: 'kde',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaa/files/17/Kororaa-17-i686-Live-KDE.iso/download', },
          ],
        },
        {
          arch: 'x86_64',
          desktop: 'gnome',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaa/files/17/Kororaa-17-x86_64-Live-GNOME.iso/download', },
          ],
        },
        {
          arch: 'x86_64',
          desktop: 'kde',
          link: [
            { type: 'HTTP', url: 'http://sourceforge.net/projects/kororaa/files/17/Kororaa-17-x86_64-Live-KDE.iso/download', },
          ],
        },
      ],
      checksums: [
        {
          arch: 'i686',
          desktop: 'gnome',
          checksum: [
            { type: 'md5', hash: '35c0f58ed2c1b3db4d24de488cedeabb' },
            { type: 'sha', hash: 'b527eade025a75a2dc899574e9d825d31534d5f7' },
            { type: 'sha256', hash: '6f6e3fee31edc54565df917a779d1138cdc876f1a02144b45f5f38e320fe6ee4' },
          ],
        },
        {
          arch: 'i686',
          desktop: 'kde',
          checksum: [
            { type: 'md5', hash: '23063b994c8241a3ed652f13a1121eec' },
            { type: 'sha', hash: 'dab1dd6f8cc997a69458e02df547a2eccde55c0f' },
            { type: 'sha256', hash: 'a1487a5eab6fc9140a2a5e035ed194bc7e42bd9a6bd3bbcedf905482cf77b5fb' },
          ],
        },
        {
          arch: 'x86_64',
          desktop: 'gnome',
          checksum: [
            { type: 'md5', hash: '31eadf3abb27197ed8f8990a0b47dad7' },
            { type: 'sha', hash: '4073edc29033615ee9b32e586a6dae79dac1fbae' },
            { type: 'sha256', hash: '0db34cf287b92b4880c489ca2128d7cffba3346dc131f4a5a07555ab12219743' },
          ],
        },
        {
          arch: 'x86_64',
          desktop: 'kde',
          checksum: [
            { type: 'md5', hash: '44eade8b4290872ab38bc27a222ffbe7' },
            { type: 'sha', hash: '95adc42d847cab0975dc07c9a38422cd94c59c1d' },
            { type: 'sha256', hash: 'ce639eb52a79a9d6688d9a73ef8747c3d6b119ecda6d5ca744c64a0677586eb4' },
          ],
        },
      ],
      available: false,
    }
  ];

  //
  // FUNCTIONS
  //

  $scope.downloadsAvailable = function() {
    var _a = [];

    for(var i=0, l=$scope.downloads.length; i<l; i++ ) {
      if( $scope.downloads[i].available ) {
        _a.push( $scope.downloads[i] );
      }
    }

    return _a;
  };

  $scope.isAvailable = function(item) {
    return item.available;
  };

  $scope.setArchDefault = function() {
    var _system_arch = ( window.navigator.userAgent.indexOf('WOW64')>-1 ||
                         window.navigator.platform == 'Win64' ||
                         window.navigator.userAgent.indexOf('x86_64')>-1 ) ? 'x86_64' : 'i686';

    var i = $scope.version.archs.indexOf(_system_arch);

    if( i < 0 ) {
      i = 0;
    }

    $scope.arch = $scope.version.archs[i];
  };

  $scope.hasArchs = function() {
    return $scope.version.archs.length > 0;
  };

  $scope.hasLinks = function() {
    return $scope.version.links.length > 0;
  };

  $scope.selectDesktop = function(d) {
    $scope.desktop = d;
  };

  $scope.selectedDesktop = function() {
    return $scope.desktop; 
  };

  $scope.validDesktop = function() {
    return ($scope.desktop !== null); 
  };

  $scope.getStabilityString = function() {
    if( $scope.version.isStable ) {
      if( $scope.version.isCurrent ) {
        return "the latest stable version";
      }
      else {
        return "an older stable version";
      }
    }
    else {
      if( $scope.version.isCurrent ) {
        return "the latest beta version";
      }
      else {
        return "an older beta version";
      }
    }
  };

  $scope.isVersionStable = function() {
    return ( $scope.version.isStable );
  };

  $scope.isSelected = function(d) {
    return ( ( $scope.desktop !== null ) && ( $scope.desktop.name === d ) );
  };

  $scope.debug = function() {
    console.log($scope.version);
    console.log($scope.arch);
    console.log($scope.desktop);
  };

  //
  // INIT
  //

  $scope.version = $scope.downloadsAvailable()[0];
 
  $scope.desktop = null;
  $scope.setArchDefault();


  //
  // INIT
  CanvasNavigation.setPage('download');
};

function CanvasController($scope, CanvasNavigation) {
  $scope.data = {};

  //
  // INIT
  CanvasNavigation.setPage('canvas-dashboard');
};

function RepositoryController($scope, CanvasNavigation) {
  $scope.data = [];

  //
  // INIT
  CanvasNavigation.setPage('canvas-repositories');
};

function PackageController($scope, CanvasNavigation, $http) {
  $scope.data = {};
  $scope.data_details = {};
  $scope._pageLoading = false;

  $scope.formatSize = function(bytes) {
    var _bytes = bytes;
    var _map = {
      1: 'b',
      2: 'k',
      3: 'M'
    };

    return bytes + 'b';
  }

  //
  // PAGINATION
  //


  //
  // PAGINATION
  //

  $scope.havePages = function() {
    return ( $scope.data.hasOwnProperty('page') ) &&
           ( $scope.data.hasOwnProperty('last_page') );
  };

  $scope.pageList = function(elements) {
    var _m = elements || 5;
    var _list = [];

    if( $scope.havePages() ) {
      var _total_pages = Math.ceil($scope.data.total_items / $scope.data.page_size);

      if( _m >= _total_pages ) {
        for( var i = 0; i < _total_pages; i++ ) {
          _list.push(i);
        }
      }
      else {
        /* calculate lower and upper bounds */
        var _lb = Math.max(0, $scope.data.page - Math.floor(_m / 2));
        var _ub = Math.min(_total_pages, _lb + _m);

        if( (_ub-_lb) <= (_m-1) ) {
          _lb = _ub - _m;
        }

        for( var i = _lb; i < _ub; i++ ) {
          _list.push(i);
        }
      }
    }

    return _list;
  }

  $scope.isFirstPage = function() {
    return ( $scope.havePages() ) &&
           ( $scope.data.page == 0 );
  };

  $scope.isLastPage = function() {
    return ( $scope.havePages() ) &&
           ( $scope.data.page === $scope.data.last_page );
  };

  $scope.currentPage = function() {
    if( ! $scope.havePages() ) {
      return 0;
    }

    return $scope.data.page;
  };

  $scope.isPage = function(page) {
    var _page = page || 0;

    return ( $scope.havePages() ) &&
           ( $scope.data.page === _page );
  };

  $scope.isPageLoading = function() {
    return $scope._pageLoading;
  }

  $scope.firstPage = function() {
    if( ( ! $scope.havePages() ) ||
        ( $scope.isFirstPage() ) ) {
      return;
    }

    $scope.loadPage({
      _cp: 0
    });
  }

  $scope.lastPage = function() {
    if( ( ! $scope.havePages() ) ||
        ( $scope.isLastPage() ) ) {
      return;
    }

    $scope.loadPage({
      _cp: $scope.data.last_page
    });
  }

  $scope.nextPage = function(elements) {
    var _m = elements || 5;

    if( ( ! $scope.havePages() ) ||
        ( $scope.isLastPage() ) ) {
      return;
    }

    $scope.loadPage({
      _cp: $scope.data.page + _m
    });
  }

  $scope.previousPage = function(elements) {
    var _m = elements || 5;

    if( ( ! $scope.havePages() ) ||
        ( $scope.isFirstPage() ) ) {
      return;
    }

    $scope.loadPage({
      _cp: $scope.data.page - _m
    });
  }

  $scope.setPage = function(page) {
    var _page = page || 0;

    if( ( ! $scope.havePages() ) &&
        ( ! $scope.isPage(page) ) ) {
      return;
    }

    $scope.loadPage({
      _cp: _page
    });
  }

  //
  // LOAD PACKAGES
  $scope.loadPage = function(param) {
    var _param = param || {};
    $scope._pageLoading = true;

    $http({
      method: 'GET',
      url: '/api/packages',
      params: _param
    })
      .success( function(data, status, headers, config) {
        $scope.data = data;

        console.log(data);
        $scope._pageLoading = false;
      })
      .error( function(data, status, headers, config) {
        $scope._pageLoading = false;
      });
  }

  //
  // DETAILS
  //
  $scope.isPackageDetailsSelected = function(id) {
    return ( ( $scope.data_details.hasOwnProperty(id) ) &&
             ( $scope.data_details[id].hasOwnProperty('_selected') ) &&
             ( $scope.data_details[id]._selected ) );
  }

  $scope.isPackageDetailsVisible = function(id) {
    return ( ( $scope.data_details.hasOwnProperty(id) ) &&
             ( $scope.data_details[id].hasOwnProperty('_visible') ) &&
             ( $scope.data_details[id]._visible ) );
  };

  $scope.togglePackageDetailsSelected = function(id) {
    // load the package details if required
    if( ! ( $scope.data_details.hasOwnProperty(id) ) ) {
      $scope.loadPackageDetails(id);
    }

    // toggle visibility
    if( $scope.data_details[id].hasOwnProperty('_selected') ) {
      $scope.data_details[id]._selected ^= true;
    }
  };

  $scope.togglePackageDetails = function(id) {
    // load the package details if required
    if( ! ( $scope.data_details.hasOwnProperty(id) ) ) {
      $scope.loadPackageDetails(id);
    }

    // toggle visibility
    if( $scope.data_details[id].hasOwnProperty('_visible') ) {
      $scope.data_details[id]._visible ^= true;
    }
  };

  //
  // LOAD PACKAGE DETAILS
  $scope.loadPackageDetails = function(id) {

    // TODO: validate id
    if( id <= 0 ) {
      return;
    }

    // check for cache
    if( $scope.data_details.hasOwnProperty(id) ) {
      return;
    }

    // initialise details object for id
    $scope.data_details[id] = {
      _pageLoading: true,
      _selected: false,
      _visible: false
    };

    $http({
      method: 'GET',
      url: '/api/package/' + id
    })
      .success( function(data, status, headers, config) {
        angular.extend($scope.data_details[id], data);

        $scope.data_details[id]._pageLoading = false;
      })
      .error( function(data, status, headers, config) {
        $scope.data_details[id]._pageLoading = false;
      });
  }

  //
  // INIT
  CanvasNavigation.setPage('canvas-packages');

  $scope.loadPage();
};