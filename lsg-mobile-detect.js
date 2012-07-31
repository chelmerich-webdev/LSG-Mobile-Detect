/* lsg-mobile.detect.js Version 1.0
 * 31 July 2012
 * Curt Helmerich
 *
 * Update the site_root agrument according to your site, for example: 
 * 'thisoldhouse.com/toh' or 'realsimple.com'.
 *
 * Leave off any subdomains, otherwise will not work.
 */

(function (site_root, window, document, user_agent) {

/* Business values we test against are defined as regexes:
 * - mobile tests
 * - preference cookie key/value pairs
 * - no_mobile query_string key/value pair
 *
 * The remainder are defined as strings
 * - referrer cookie
 * - mobile path
 */
    var is_mob   = /ip(hone|od)|android.+mobile|blackberry/i,
        pref_mob = /TI_PREFS=phone/,
        pref_tab = /TI_PREFS=tablet/,
        pref_def = /TI_PREFS=default/,
        no_mob   = /nomobile=1/,
        omniture_cookie = 'orig_ref',
        mob_path = '/m',
        cookie = document.cookie,
        redirect = function() {
        /* Build mobile version of the url */
            var regex = new RegExp(site_root + '/$|' + site_root),
                replacement = site_root + mob_path,
                mob_url  = window.location.href.replace(regex, replacement);
        /* Set preference for mobile */
            document.cookie = pref_mob.source;
        /* Set Omniture cookie to capture referrer */
            document.cookie = omniture_cookie + '=' + document.referrer;
        /* Execute redirect */
            window.location = mob_url;
        };

/* If preference for default or tablet, skip redirect */
    if (pref_def.test(cookie) || pref_tab.test(cookie)) {
        return;
    }

/* Honor no_mobile request by updating cookie and skipping redirect */
    if (no_mob.test(window.location.search)) {
        document.cookie = pref_def.source;
        return;
    }

/* Redirect if pref_mobile cookie or if a user_agent target,
 * otherwise indicate prefernce for default version
 */
    if (pref_mob.test(cookie) || is_mob.test(user_agent)) {
        redirect();
    } else {
        document.cookie = pref_def.source;
    }

}('thisoldhouse.com/toh', window, document, navigator.userAgent));