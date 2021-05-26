var namespace,
  cssParser = new cssjs(),
  $injector,
  servicesMap,
  utils,
  http;

self.onInit = function () {
  ctx = self.ctx;
  $injector = ctx.$scope.$injector;
  servicesMap = ctx.servicesMap;

  utils = self.ctx.$injector.get(ctx.servicesMap.get("utils"));
  http = $injector.get(ctx.servicesMap.get("http"));

  ctx.widgetTitle = "Simple Button With HTTP Request";

  namespace = "dnk-widget-" + utils.guid();
  cssParser.testMode = false;
  cssParser.cssPreviewNamespace = namespace;
  ctx.$container.addClass(namespace);

  ctx.ngZone.run(function () {
    init();
  });

  ctx.updateWidgetParams();
};

function init() {
  var scope = self.ctx.$scope;
  var settings = self.ctx.settings;

  /* -------------------------------------------------------------------------
    UI functions
------------------------------------------------------------------------- */

  scope.isLoading = false;
  scope.joke = {};

  scope.goButtonHandler = ($event) => {
    scope.isLoading = true;
    makeHTTPRequest();
  };

  const populateUI = (data) => {
    scope.isLoading = false;
    scope.joke = data;

    self.ctx.detectChanges();
  };

  /* -------------------------------------------------------------------------
    HTTP functions
------------------------------------------------------------------------- */

  makeHTTPRequest = () => {
    let url = "https://api.chucknorris.io/jokes/random";

    http.get(url).subscribe(
      (res) => {
        console.log("Woot :)", res);
        populateUI(res);
      },
      (res) => {
        console.log("Oups :(", res);
        populateUI({});
      }
    );
  };

  self.onResize();
} // Init function end

self.onResize = function () {};

self.onDestroy = function () {};
