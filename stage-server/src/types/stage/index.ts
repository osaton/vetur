export {};
declare global {
  class $ {
    static db: typeof $DB;

    /**
     * Initializes a session and returns a Session object
     *
     * @param lifetime = `14400` - Session lifetime in seconds. Default is four hours.
     * @param domain = `null` - Session domain. If `null`, uses the current domain.
     * @param path = `"/"` - Path that restricts the session.
     */
    static session(lifetime?: number, domain?: null | string, path?: string): SessionObject;

    /**
     * Active language version
     *
     * <aside class="warning">
     * Doesn't get updated in the same script after [[Stage.setLanguage]]() has been used.
     * </aside>
     */
    static lang(): string;
  }

  class $DB {
    static q: typeof StageDB.query;
    static f: typeof StageDB.field;
    static allrows: typeof StageDB.allRows;
    static cols: typeof StageDB.columns;
    static len: typeof StageDB.count;
    static exists: typeof StageDB.rowExists;
    static get: typeof StageDB.getFieldValue;
    static set: typeof StageDB.setFieldValue;
    static name: typeof StageDB.name;
    static names: typeof StageDB.names;
    static lang: typeof StageDB.setLanguage;
    static explain: typeof StageDB.explain;

    /**
     * Iterates over SELECT query results.
     *
     * @param resultId - Query result from [[StageDB.query]]()
     * @param callback - Iteration function - note that you can't use arrow functions here
     * @param parameters - Field parameters passed to each field
     */
    static each(resultId: string, callback: (rowId: string) => void, parameters?: Record<string, any>): void;
  }
}
export {};
declare global {
  /**
   * This session object can be mutated to update the session automatically.
   */
  let Session: SessionObject;
}
export {};
declare global {
  class Mustache {
    /**
     * Mustache render template
     *
     * Documentation at [GitHub](https://github.com/janl/mustache.js/)
     *
     * @param template - Template
     * @param view - View
     * @param partials = `{}` - Partials
     */
    static render(template: string, view: Record<string, any>, partials?: Record<string, any>): string;
  }
}
export {};
declare global {
  // Prototype functions
  interface String {
    /**
     * Formats a number
     *
     * @param decimals = `0` - Amount of decimals
     * @param decimalPoint = `","` - Defines the character to use as the decimal point
     * @param thousandsSeparator = `""` - Defines the character to use as the thousand separator
     */
    numberFormat(decimals?: number, decimalPoint?: string, thousandSeparator?: string): string;

    /**
     * Encrypts a string.
     *
     * @param secretKey - Secret key used to encrypt.
     *
     * If omitted, a site specific secret key is used instead.
     */
    encrypt(secretKey?: string): string;
    /**
     * Decrypts a string.
     *
     * @param secretKey - Secret key used to decrypt.
     *
     * If omitted, a site specific secret key is used instead.
     */
    decrypt(secretKey?: string): string;
    /**
     * Returns MD5 hash
     */
    MD5(): string;
    /**
     * Returns SHA1 hash
     */
    SHA1(): string;
    /**
     * Returns hash
     *
     * @param algorithm = `"sha256"` - Algorithm to use.
     * <aside class="notice">
     * Available algorithms can be found from {@link https://www.php.net/manual/en/function.hash-algos.php|PHP hash_algos() documentation} documentation. Note that available algorithms vary depending on platform, so it's not guaranteed that all of these are available and some not on the list may be available.
     * </aside>
     * @param rawOutput = `false` - If set to `true`, returns binary.
     *
     * If set to `"base64"`, returns base64 encoded binary.
     */
    hash(algorithm?: string, rawOutput?: boolean | string): string;
    /**
     * Returns keyed HMAC hash
     *
     * @param key - Shared secret key
     * @param algorithm = `"sha256"` - Algorithm to use.
     * <aside class="notice">
     * Available algorithms can be found from {@link https://www.php.net/manual/en/function.hash-algos.php|PHP hash_algos() documentation} documentation. Note that available algorithms vary depending on platform, so it's not guaranteed that all of these are available and some not on the list may be available.
     * </aside>
     * @param rawOutput = `false` - If set to `true`, returns binary.
     *
     * If set to `"base64"`, returns base64 encoded binary.
     */
    hashHmac(key: string, algorithm?: string, rawOutput?: boolean | string): string;

    /**
     * Encrypts a string with selected algorithm.
     * @param key - Secret key for the algorithm.
     *
     * Must be of the proper size. Will accept hex-encoded keys of proper length (eg. twice the size of non-hex key).
     * @param iv - Initialization Vector for the algorithm. If given as null or empty, an IV is automatically generated.
     *
     * If defined, must be correct length. Accepted in hex or base64 encoded binary.
     * @param algo - Select one of the following algorithms:
     *
     * * aes-128-cbc
     * * aes-128-ctr
     * * aes-128-ofb
     * * aes-128-cfb
     * * aes-256-cbc
     * * aes-256-ctr
     * * aes-256-ofb
     * * aes-256-cfb
     * * 3des
     */
    encryptWithAlgo(key: string, iv: string, algo: string): EncryptWithAlgoResponse;
    /**
     * Decrypts a ciphertext with selected algorithm.
     * @param key - Secret key for the algorithm.
     *
     * Must be of the proper size. Will accept hex-encoded keys of proper length (eg. twice the size of non-hex key).
     * @param iv - Initialization Vector for the algorithm. Must use the same iv that was used for encryption.
     * @param algo - Select one of the following algorithms:
     *
     * * aes-128-cbc
     * * aes-128-ctr
     * * aes-128-ofb
     * * aes-128-cfb
     * * aes-256-cbc
     * * aes-256-ctr
     * * aes-256-ofb
     * * aes-256-cfb
     * * 3des
     */
    decryptWithAlgo(key: string, iv: string, algo: string): string;
  }
  interface Number {
    /**
     * Formats a number
     *
     * @param decimals = `0` - Amount of decimals
     * @param decimalPoint = `","` - Defines the character to use as the decimal point
     * @param thousandsSeparator = `""` - Defines the character to use as the thousand separator
     */
    numberFormat(decimals?: number, decimalPoint?: string, thousandSeparator?: string): string;
  }
}
export {};
declare global {
  /**
   * Contains core functionality for Stage
   */
  class Stage {
    /**
     * Active language code.
     *
     * Doesn't get updated in the same script after [[Stage.setLanguage]]() has been used.
     */
    static readonly language: string;
    /**
     * If `true`, script is running in admin context.
     *
     * @static
     * @type {boolean}
     * @memberof Stage
     */
    static readonly admin: boolean;
    static readonly db: typeof StageDB;
    static readonly info: InfoObject;
    /**
     * Adds a task to the task queue.
     *
     * Tasks are executed by fetching tasks and updating their status with other task functions.
     *
     * @param type - Task type. Freeform type that is used to identify tasks.
     * @param parameters - Parameters to pass with the task.
     * @param title - Task title.
     * @returns Numeric id of the task as a string. `false` if adding the task failed.
     */
    static addTask(type: string, parameters: Record<string, any>, title?: string): string | false;
    /**
     * Returns task information.
     *
     * @param id - Task id.
     * @returns [[TaskObject]], or `null` if task was not found.
     */
    static getTask(id: string): TaskObject;
    /**
     * Returns tasks by type.
     *
     * @param type - Task type. Freeform type that is used to identify tasks.
     * @param status = `new`- Task status of tasks to get.
     * @returns An array of [[TaskObject]].
     */
    static getTasks(type: string, status?: TaskStatus): TaskObject[];
    /**
     * Initializes a task and returns a Studio object.
     *
     * Calling this function makes sense only inside a background process.
     *
     * @param task - This is the return value of [[Stage.getTask]] and [[Stage.getTasks]].
     */
    static initializeTask(task: TaskObject): Record<string, any>;
    /**
     * Requests execution of a background process.
     *
     * This function can be used to request immediate execution of a background process without waiting for scheduled execution.
     *
     * Even when background process execution is requested, immediate execution is not guaranteed. In many cases it does get executed right away, but it's not uncommon for background processes to get queued up.
     *
     * Do not call this function for actions that happen several times a minute. Instead set a schedule for your background process to run for example once a minute which iterates over tasks.
     *
     * This function is best used for actions that happen infrequently when it's more efficient to not run a scheduled task continuously.
     */
    static requestRun(type: string, id: string): boolean;
    /**
     * Sets task status.
     *
     * Using Stage.setTaskStatus() during the same execution is not possible after Stage.addTask() has been used.
     *
     * Getting task status by any means during the same execution after Stage.setTaskStatus() has been used on a task does not contain the updated status information.
     */
    static setTaskStatus(id: string, status: TaskStatus, returnData: Record<string, any>): boolean;
    /**
     * Stores a value in a hash in cache for a period of time.
     *
     * @param hash - Hash id
     * @param id - Entry id
     * @param value - Value to store.
     * Value can be anything that can be serialized as JSON.
     * @param ttl = `3600` - Entry time to live in seconds.
     * You cannot disable caching by settings this to `0` - `null` and `0` are interpreted as 28800 (8 hours)
     * <aside class="notice">
     * Due to technical reasons TTL is a maximum time to live and it is also not exact. If you set a TTL for 3600 seconds, your value will be available for a minimum of 1 seconds and up to 4020 seconds.
     *
     * It's a maximum, because after a hash expires, the first value will set the TTL and every other value will use that until the next expiration.
     *
     * It's not exact, because depending on random factors, some hash keys will get a bit smaller or a bit higher TTL to fragment expiration of similar keys and spread the load that occurs when populating the cache again. Keys belonging to same hash end up having 16 different TTLs.
     * </aside>
     * @param ignoreLanguage = `false` - If `true`, this value is stored as a global (non-localized) value for this key.
     *
     * <aside class="warning">
     * Same cache id can be used for both localized and global values, you need to use global flag when getting a global cached value, otherwise localized value will be fetched.
     * </aside>
     * @param ignoreAdmin = `false` - This param has only effect when this function is ran in admin context. If true, uses published cache even in admin context.
     */
    static cacheHash(
      hash: string,
      id: string,
      value: any,
      ttl?: number,
      ignoreLanguage?: boolean,
      ignoreAdmin?: boolean
    ): true;
    /**
     * Gets value from a cache hash.
     *
     * TTL is not required for backwards compatibility, but it may cause multiple fetches from the cache.
     *
     * @param hash - Hash name
     * @param id - Entry id
     * @param ttl = `null` - TTL that the hash/key combination has been set with.
     *
     * If `null`, will search for all the different hash/TTL combinations used with this hash with a small performance hit.
     * @param ignoreLanguage = `false` - If `true`, get global (non-localized) value for this cache id.
     *
     * <aside class="warning">
     * Same cache id can be used for both localized and global values, you need to use global flag when getting a global cached value, otherwise localized value will be fetched.
     * </aside>
     * @param ignoreAdmin = `false` - This param has only effect when this function is ran in admin context. If true, uses published cache even in admin context.
     */
    static getCacheHash(hash: string, id: string, ttl?: number, ignoreLanguage?: boolean, ignoreAdmin?: boolean): any;
    /**
     * Clears a value of a hash from cache.
     *
     * <aside class="notice">
     * By default, in admin context both published and non-published caches for the key are flushed. In published context only published cache is flushed.
     * </aside>
     * @param hash - Hash id
     * @param id - Entry id
     * @param prefix = `false` - If `true`, all entry ids beginning with the string defined in id parameter are cleared from the cache.
     * @param ttl = `null` - If set, only flushes hashes set with the given TTL.
     *
     * If not set, flushes all hash TTLs with a performance penalty (executes as many flushes as TTLs used with the hash).
     */
    static flushCacheHash(hash: string, id: string, prefix?: boolean, ttl?: number): true;
    /**
     * Executes an HTTP redirect.
     *
     * <aside class="notice">
     * This function is disabled inside Stage editor.
     * </aside>
     *
     * @param url - Target url.
     * @param statusCode = `301` - HTTP status code (3xx)
     * @param terminate  = `true` - If `true`, execution is stopped immediately.
     * If `false`, script execution completes in a normal fashion. This is required if for example session needs to be updated with values set in the same context as the httpRequest was executed in.
     * @param commit = `true` - If `true`, changes made during script execution are preserved.
     * If `false`, changes are rolled back.
     */
    static httpRedirect(url: string, statusCode?: number, terminate?: boolean, commit?: boolean): true;
    /**
     * Executes an HTTP request, the response includes also headers.
     *
     * @param url - Requested URL
     * @param type = `"GET"` - HTTP method
     * @param post = `""` - data. Content-Type is automatically set to application/x-www-form-urlencoded when this is a string and multipart/form-data when this is an object.
     * @param headers = `{}` - This parameter adds headers to the request. Object keys are header names and values are header values.
     * @param timeout = `5` - Time in seconds until the request times out.
     * @param cookies = `true` - Are cookies used with the request. Note that these cookies are between Stage server and the requested url, not visitors cookies.
     * @param sslverify = `true` - Defines whether or not to check for certificate validity for HTTPS requests.
     * @param clientCert = `false` - SSL/TLS client certificate information.
     */
    static httpRequestWithHeaders(
      url: string,
      type?: RequestType,
      post?: string | Record<string, string>,
      headers?: Record<string, string>,
      timeout?: number,
      cookies?: boolean,
      sslverify?: boolean,
      clientCert?: string | Certificate
    ): HttpResponse | false;
    /**
     * Returns last error from [[Stage.httpRequest]]() or [[Stage.httpRequestWithHeaders]]().
     *
     * <aside class="warning">
     * Never expose the return value directly to a user. This is a convenience method for developer use.
     * </aside>
     *
     * @returns a string containing description of last error. `null` if there has been no error.
     */
    static lastHttpRequestError(): string | null;

    /**
     *
     * @param module - Module name.
     *
     * For global modules use the usual `stage/` or `stage-test/` prefix. You may use version range operators to get the callback URL if you wish, but the URL itself will include the resolved version.
     * @param settings = `{}`
     * @returns callback URL
     */
    static getModuleCallbackUrl(module: string, settings: CallbackSettings): string;

    /**
     * Adds a variable into debug log.
     *
     * The output of the debugLog will be shown in developer tools console of the browser.
     *
     * @param variable - Variable to output
     */
    static debugLog(variable: any): null;

    /**
     * Sets active language.
     *
     * This function is required for example for background processes to set the active language.
     *
     * <aside class="notice">
     * This does not set the active language used for databases. Use [[StageDB.setLanguage]]() to set the database language.
     * </aside>
     *
     * @param language - language
     */
    static setLanguage(language: string): true;

    // ## Session functions

    /**
     * Adds a callback to session.
     *
     * @param scriptlet - Scriptlet reference of the scriptlet to execute.
     * @param timeout = `300` - Inactivity time in seconds after which the callback is executed. Minimum timeout is 300 seconds, which means that all values under 300 are effectively 300 seconds.
     *
     * Every page load during session moves the execution time forward.
     *
     * If the value given is "expiry", the function will be executed when 300 seconds has passed since the end of the session.
     *
     * Because callback executions are effectively pollers, the execution time is not exact. Callback calls are executed every 300 seconds. Execution occurs at earliest at the given timeout and latest 300 seconds later, so 300 timeout is actually roughly 300-599 seconds.
     * @param removeOnExecute = `true` - If `true`, callback is removed after execution, otherwise it's executed until the session ends, as long as the timeout rule is fulfilled.
     * @returns always `true`
     */
    static addSessionCallback(scriptlet: string, timeout: number | 'expiry', removeOnExecute: boolean): true;

    /**
     * Returns session, if active.
     *
     * <aside class="notice">
     * It's better to use $.session() helper function instead of this function.
     * </aside>
     */
    static getSession(): SessionObject | null;

    /**
     * Returns registered callbacks
     */
    static getSessionCallbacks(): SessionCallback[];

    /**
     * Checks if there is an active callback waiting for session expiry or inactivity for a scriptlet.
     *
     * @param scriptlet - Scriptlet reference
     */
    static hasSessionCallback(scriptlet: string): boolean;

    /**
     * Saves a session.
     *
     * Usually session is saved automatically from Session object, but if a page contains for example a redirect, the session needs to be saved manually before the redirect by using this function.
     *
     * @param session - Session object
     */
    static saveSession(session: SessionObject): true;

    /**
     * Initializes a session.
     *
     * <aside class="notice">
     * It's better to use $.session() helper function instead of this function.
     * </aside>
     *
     * @param lifetime = `14400` - Session lifetime in seconds. Default is four hours.
     * @param domain = `null` - Session domain. If `null`, uses the current domain.
     * @param path = `"/"` - Path that restricts the session.
     */
    static startSession(lifetime?: number, domain?: string | null, path?: string): SessionObject;

    /**
     * Stops a session.
     *
     * @param clearOnly = `false` - If `true`, doesn't end the session but clears all the variables stored in the session.
     *
     * Difference between stopping and clearing it is that the callback functions registered to session aren't executed once the session is stopped. If the session is only cleared, the callbacks are retained and they are executed as scheduled.
     */
    static stopSession(clearOnly?: boolean): true;

    /**
     * Sets the HTTP status code
     *
     * <aside class="notice">
     * 4xx and 5xx status codes have a special meaning. Any status code in those categories end the execution of the page immediately and don't save anything into database *unless* `customerror` parameter is set to `true`.
     * </aside>
     *
     * @param statusCode - Status code.
     * @param statusMessage = `null` - Status message.
     *
     * If this is omitted, system uses a predefined message for the given status code.
     * @param customerror
     */
    static setHttpStatus(statusCode: number, statusMessage?: string | null, customerror?: boolean): true;

    /**
     * Sets an HTTP header
     *
     * @param header - Header name.
     * @param value - Header value.
     */
    static setHttpHeader(header: string, value: string): true;

    // ## Logging functions

    /**
     * Logs a message into Crasman's centralized logging service
     *
     * <aside class="info">
     * Logs are generally preserved for at least 3 months.
     *
     * If you need permanent or very long logging, consider using other options. Stage databases are not suitable for large scale logging and should be avoided.
     * </aside>
     *
     * <aside class="warning">
     * Never log sensitive information such as passwords etc.
     * </aside>
     *
     * @param level - Message level
     * 0: emergency
     * 1: alert
     * 2: critical
     * 3: error
     * 4: warning
     * 5: notice
     * 6: info
     * 7: debug
     * @param shortMessage - Short version of the message
     * @param longMessage = `null` - Longer version of the message
     * @param additional = `{}` - Additional key-value pairs which are stored into Elasticsearch (a key called "site" is added automatically)
     */
    static logMessage(
      level: LogLevel,
      shortMessage: string,
      longMessage?: string | null,
      additional?: Record<string, any>
    ): void;

    /**
     * Set a single value
     *
     * @param action
     * @param key - Key
     * @param value - Value
     */
    static kv(action: 'set', key: string, value: any): boolean;
    /**
     * Set multiple values
     *
     * @param action
     * @param values - Values to set in an object, keys as keys and values as values
     */
    static kv(action: 'setMultiple', values: Record<string, any>): boolean;
    static kv(action: 'get', key: string, defaultValue?: any): any;
    static kv<T extends string>(action: 'getMultiple', keys: Array<T>, defaultValue?: any): Record<T, any>;
    static kv(action: 'remove', key: string): boolean;
    static kv(action: 'removeMultiple', keys: string[]): number;
    /**
     * Removes by pattern.
     *
     * Pattern format depends on backend type.
     *
     * mysql - supports % and _ wildcards and minimum length (not counting wildcards) is 3 characters
     *
     * @param action
     * @param pattern
     */
    static kv(action: 'removeByPattern', pattern: string): number;
    static kv(action: 'exists', key: string): boolean;
    /**
     * Returns keys in store by pattern
     *
     * Pattern format depends on backend type.
     *
     * mysql - supports % and _ wildcards and minimum length (not counting wildcards) is 3 characters
     *
     * @param action
     * @param pattern
     */
    static kv(action: 'keys', pattern?: string): Record<string, any>;

    static kv(settings: KeyValueStoreSettings, action: 'set', key: string, value: KeyValueStoreValue): boolean;
    static kv(
      settings: KeyValueStoreSettings,
      action: 'setMultiple',
      values: Record<string, KeyValueStoreValue>
    ): boolean;
    static kv(
      settings: KeyValueStoreSettings,
      action: 'get',
      key: string,
      defaultValue?: KeyValueStoreValue
    ): KeyValueStoreValue;
    static kv<T extends string>(
      settings: KeyValueStoreSettings,
      action: 'getMultiple',
      keys: Array<T>,
      defaultValue?: KeyValueStoreValue
    ): Record<T, KeyValueStoreValue>;
    static kv(settings: KeyValueStoreSettings, action: 'remove', key: string): boolean;
    static kv(settings: KeyValueStoreSettings, action: 'removeMultiple', keys: string[]): number;
    static kv(settings: KeyValueStoreSettings, action: 'removeByPattern', pattern: string): number;
    static kv(settings: KeyValueStoreSettings, action: 'exists', key: string): boolean;
    static kv(settings: KeyValueStoreSettings, action: 'keys', pattern?: string): string[];

    static kv(
      settings: KeyValueStoreSettings,
      action: 'zAdd',
      key: string,
      members: KeyValueStoreSortedSetMember | KeyValueStoreSortedSetMember[],
      options?: Record<string, any>
    ): number;
    static kv(settings: KeyValueStoreSettings, action: 'zCard', key: string): number;
    static kv(
      settings: KeyValueStoreSettings,
      action: 'zCount',
      key: string,
      minScore: number,
      maxScore: number
    ): number;
    /**
     * Removes and returns up to $count members with the lowest scores in the sorted set stored at `key`.
     *
     * Return value is an array of popped elements and scores.
     *
     * @param settings
     * @param action
     * @param key
     * @param count = `1` - Number of members to pop
     * @param options
     */
    static kv(
      settings: KeyValueStoreSettings,
      action: 'zPopMin',
      key: string,
      count?: number,
      options?: Record<string, any>
    ): [KeyValueStoreValue, number];
    /**
     * Removes and returns up to $count members with the highest scores in the sorted set stored at `key`.
     *
     * Return value is an array of popped elements and scores.
     *
     * @param settings
     * @param action
     * @param key
     * @param count = `1` - Number of members to pop
     * @param options
     */
    static kv(
      settings: KeyValueStoreSettings,
      action: 'zPopMax',
      key: string,
      count?: number,
      options?: Record<string, any>
    ): [KeyValueStoreValue, number];
    static kv(
      settings: KeyValueStoreSettings,
      action: 'zRange',
      key: string,
      start: number,
      stop: number,
      options?: Record<string, any>
    ): KeyValueStoreValue[] | Record<KeyValueStoreValue, number>;
    static kv(
      settings: KeyValueStoreSettings,
      action: 'zRangeByScore',
      key: string,
      minScore: number,
      maxScore: number,
      options?: Record<string, any>
    ): KeyValueStoreValue[] | Record<KeyValueStoreValue, number>;
    static kv(settings: KeyValueStoreSettings, action: 'zRem', key: string, members: KeyValueStoreValue[]): number;
    static kv(
      settings: KeyValueStoreSettings,
      action: 'zRemRangeByScore',
      key: string,
      minScore: number,
      maxScore: number
    ): number;

    /**
     * Logs a simple info level message.
     *
     * For more options use [[Stage.logMessage]]().
     *
     * @param message = `""`
     */
    static siteLog(message?: string): void;

    /**
     * Fetches a configuration entry.
     *
     * In cloud environment these are configurable under Manage in Stage.
     *
     * In the crasman.fi environment, contact support if you need to set a configuration entry.
     * @param key - string
     * @returns - Configuration setting as a string, or `null` if no setting found.
     */
    static getConfig(key: string): string | null;

    /**
     * Returns current URL
     *
     * @param type = `full`
     * <table><thead><tr><th>Value</th><th>Description</th><th>Example</th></tr></thead>
     * <tbody>
     * <tr><td>full</td><td>Complete URL</td><td>https://domain.com/some/path</td></tr>
     * <tr><td>relative</td><td>URL without scheme</td><td>domain.com/some/path</td></tr>
     * <tr><td>host</td><td>Scheme and host</td><td>https://domain.com</td></tr>
     * </tbody>
     * </table>
     */
    static getUrl(type: 'full' | 'relative' | 'host'): string;

    /**
     * Returns raw POST data.
     *
     * <aside class="notice">
     * This works only if POST data is not `multipart/form-data`. Use the `Post` object to get the values with it.
     * </aside>
     */
    static getRawPost(): string;

    /**
     * This function can be used to prevent execution of same task multiple times in a given period.
     *
     * <aside class="info">
     * <ul>
     * <li>Throttling works across requests</li>
     * <li>Throttling is per IP – users do not get throttled when other users from other IP addresses have triggered throttling</li>
     * <li>Throttling does not work in background processes</li>
     * </ul>
     * </aside>
     *
     * @param time = `500` - Time in milliseconds that needs to pass until this function returns true with same id.
     * @param id = `null` - Using a throttle id allows using multiple throttles at the same time. If omitted, throttling is done per page.
     */
    static throttle(time?: number, id?: string): boolean;

    /**
     * Generates a unique identifier
     *
     * @param type = `0` -<br>
     * Supported types:<br>
     * 0: Default uuid (example: `epcWqj_ySJeQj-HWJQTujw`)<br>
     * 1: PHP uuid extension, based on time and MAC address (example: `108a3192-d3e9-11e2-b552-00163e5314ea`)<br>
     * 2: PHP uuid extension, random (example: `3f52d8b5-bba1-4536-ae23-8e92ab8b98d0`)
     * @returns - UUID as a string
     */
    static generateUuid(type?: 0 | 1 | 4): string;
  }
}
export {};
declare global {
  /**
   * Stage.db methods.
   *
   * This "class" is not available via StageDB, but instead through Stage.db.
   */
  class StageDB {
    /**
     * Executes a database query.
     *
     * <aside class="warning">
     * If you UPDATE a database when a language version that doesn't exist for the database is active, the default language version is updated instead.
     * </aside>
     *
     * @param scriptletId - A reference to the query scriptlet
     * <aside class="notice">
     * <p>You can execute any code inside query code for formatting, but it's best practice to keep logic out of queries.</p>
     * <p>Code related to databases (like [[StageDB.setLanguage]]()) cause errors when used inside query scriptlets and should never be used.</p>
     * </aside>
     * @param localVariables = `{}`- Property names of this object acts as local variables in the query scriptlet
     * @param persistent = `false` - If `true`, query results are usable during the whole Stage page execution. If `false`, the result is usable only inside the running scriptlet.
     * @returns `INSERT`: New row uuid. `UPDATE/DELETE`: Returns a `resultId` that can be used only with [[StageDB.affectedRows]]() function. `SELECT`: Returns a `resultId` that can be used in other database functions to process the results.
     */
    static query(scriptletId: string, localVariables?: Record<string, any>, persistent?: boolean): string;

    /**
     * Returns a given field from a given row from a query result.
     *
     * @param resultId - Query result from [[StageDB.query]]
     * @param rowNumber - Result row number
     * @param fieldName - Field name
     * @param parameters = `{}` - If this parameter is `"raw"` or `{raw: true}`, the field value is not
     * handled through database field component but it will be returned unprocessed as it is stored in the database.
     * @returns Field value
     */
    static field(
      resultId: string,
      rowNumber: number,
      fieldName: string,
      parameters?: 'raw' | Record<string, any>
    ): string;

    /**
     * Returns all rows of a query.
     *
     * @param resultId - Result id from [[StageDB.query]]()
     * @param parameters = `{}` - Parameters to pass to the fields, that somehow affect the field output.
     * @param resultKey = `null` - Field name to use as row property names in result object.
     *
     * If `null`, none of the fields are used as property names, but the results will be returned as array instead.
     * @param raw = `false` - If `true`, values are returned as internally stored in database without database field component processing.
     * @returns If `resultKey` is `null`, returns an array of result rows.
     *
     * If `resultKey` is one of the database fields, returns an object which will have property names from the given field value.
     * If the same value is found multiple times from the database, some of the rows will be omitted.
     */
    static allRows(
      resultId: string,
      parameters?: Record<string, any>,
      resultKey?: undefined | null,
      raw?: boolean
    ): ResultRow[];

    static allRows(
      resultId: string,
      parameters?: Record<string, any>,
      resultKey?: string,
      raw?: boolean
    ): { [resultKey: string]: ResultRow };

    /**
     * Returns all fields from a given row.
     *
     * @param resultId - Query result from [[StageDB.query]]()
     * @param rowNumber - Row number
     * @param parameters = `{}` - Field parameters
     * @returns Object which has field ids as property names and field values as values.
     *
     * `false` if the row doesn't exist.
     */
    static columns(resultId: string, rowNumber: number, parameters?: Record<string, any>): Record<string, any> | false;

    /**
     * Returns number of found rows in a query result.
     *
     * @param resultId - Query result from [[StageDB.query]]
     * @returns Number of rows
     */
    static count(resultId: string): number;

    /**
     * Checks if a row with a given value exists.
     *
     * @param database - Database
     * @param field - Field
     * @param value - Value to search
     * @returns If not found, returns `false`.
     *
     * If found, returns row [[Uuid]] of the first row returned.
     */
    static rowExists(database: string, field: string, value: string): string | false;

    /**
     * Sets the active database language.
     *
     * When using this, remember to change the database language back to original if required.
     *
     * @param language - Language to use
     */
    static setLanguage(language: string): null;
    /**
     * Returns a field or fields from a row of a database.
     *
     * @param database - Database to query from
     * @param id - Value of the id fields
     *
     * `idField` parameter can be set to define an alternative field to act as the id field.
     * @param fields - Field or fields to fetch.
     * @param idField = `"uuid"` - Field to use as the id field.
     * @param cache = `true` - Whether or not to save the value in cache for the duration of page execution.
     * @returns If one field was requested, returns the field value as a string.
     *
     * If multiple fields were requested, returns the field values in an object.
     *
     * If row wasn't found, returns `false`.
     */
    static getFieldValue<T extends string | string[]>(
      database: string,
      id: string,
      fields: T,
      idField?: string,
      cache?: boolean
    ): T extends string ? T : Record<string, any> | false;

    /**
     * Sets a field to matching rows in a database
     *
     * @param database - Database
     * @param idFieldValue - Value of the id field to search for for rows to update
     * @param field - Field to update
     * @param value - Value to set
     * @param idField = `"uuid"` - Field to use as the id field
     * @returns Returns matched row count or `false` if no rows were matched.
     *
     * Note that even if the requested field value doesn't change, this always returns the amount of rows found by matching id field value.
     */
    static setFieldValue(
      database: string,
      idFieldValue: string,
      field: string,
      value: string,
      idField?: string
    ): number | false;

    /**
     * Returns the localized name of a field
     *
     * @param database - Database
     * @param field - Field
     * @returns Localized field name or `null` if field doesn't exist
     */
    static name(database: string, field: string): string | null;

    /**
     * Returns all localized names of database fields.
     *
     * @param database - Database
     * @returns Localised field names in an object which has field ids as property names and field names as values.
     *
     * Returns an empty array if the database doesn't exist.
     */
    static names(database: string): Record<string, string> | [];

    /**
     * Explains a query
     *
     * @param scriptletId - Scriptlet id
     * @param localVariables = `{}` - Local variables passed to scriptlet
     * @returns Explain object
     */
    static explain(scriptletId: string, localVariables?: Record<string, any>): ExplainObject;
  }
}
type CallbackSettings = {
  /**
   * Defines which property contains the function in the object that the module exports.
   *
   * This can be omitted to just require the module when the callback URL is accessed.
   */
  callbackName: string;
  /**
   * This object is passed back to the callback function when it's called.
   *
   * It is guaranteed that the URL cannot be modified to alter these settings.
   */
  settings?: Record<string, any>;
};

type Certificate = {
  /**
   * Certificate file location.
   */
  certFile: string;
  /**
   * Certificate file type. Defaults to `"PEM"`.
   */
  certType?: CertificateType;
  /**
   * Certificate file password.
   */
  certPass?: string;
  /**
   * (Encrypted) private key file location.
   */
  keyFile?: string;
  /**
   * Private key type. Defaults to `"PEM"`.
   */
  keyType?: CertificateType;
  /**
   * Private key password.
   */
  keyPass?: string;
};

type CertificateType = 'PEM' | 'DER' | 'ENG';

type User = {
  /** Username */
  username: string;
  /** Real name (if Name field is set in the user module) */
  name: string;
  /** User's title field (if Title field is set in the user module) */
  by_line: string;
  /** Group ids as property names and descriptions as values */
  groups: Record<string, string>;
  /**
   * Last login time (if Last login field is set in the user module).
   *
   * Current login is not taken into account, so it's the previous login time.
   */
  last_logged: string;
  /**
   * Login counter (if Times logged field is set in the user module).
   *
   * Current login is not taken into account, so it's the count after previous login.
   */
  times_logged: string;
  [key: string]: any;
};

type ExtranetObject = {
  /** `true` if user is authenticated */
  authenticated: boolean;
  /** Session start time */
  session_started: string;
  /** Latest session access (usually page hit) time */
  last_activity: string;
  /** User information */
  user: User;
  /**
   * Session provider id.
   *
   * Providers are extranet modules.
   *
   * This is only required if there are more than one ways to log in and it's required to know what kind of login has occured.
   */
  provider: string;
  /**
   * User IP address.
   *
   * Gentle reminder to not store IP anywhere that is not GDPR protected.
   */
  ip: string;
};

type HttpResponse = {
  body: string;
  headers: string;
  request: string;
  status: number;
  'content-type': string;
};

type InfoObject = {
  extranet: ExtranetObject;
  page: PageObject;
};

type Language =
  | 'af_ZA'
  | 'an_ES'
  | 'ar'
  | 'ar_AE'
  | 'ar_BH'
  | 'ar_DZ'
  | 'ar_EG'
  | 'ar_IN'
  | 'ar_IQ'
  | 'ar_JO'
  | 'ar_KW'
  | 'ar_LB'
  | 'ar_LY'
  | 'ar_MA'
  | 'ar_OM'
  | 'ar_QA'
  | 'ar_SA'
  | 'ar_SD'
  | 'ar_SY'
  | 'ar_TN'
  | 'ar_YE'
  | 'be_BY'
  | 'bg_BG'
  | 'br_FR'
  | 'bs_BA'
  | 'ca_ES'
  | 'cs_CZ'
  | 'cy_GB'
  | 'dk'
  | 'da_DK'
  | 'de'
  | 'de_AT'
  | 'de_BE'
  | 'de_CH'
  | 'de_DE'
  | 'de_LU'
  | 'el_GR'
  | 'en'
  | 'en_AU'
  | 'en_BW'
  | 'en_CA'
  | 'en_DK'
  | 'en_GB'
  | 'en_HK'
  | 'en_IE'
  | 'en_IN'
  | 'en_NZ'
  | 'en_PH'
  | 'en_SG'
  | 'en_US'
  | 'en_ZA'
  | 'en_ZW'
  | 'es'
  | 'es_AR'
  | 'es_BO'
  | 'es_CL'
  | 'es_CO'
  | 'es_CR'
  | 'es_DO'
  | 'es_EC'
  | 'es_ES'
  | 'es_GT'
  | 'es_HN'
  | 'es_MX'
  | 'es_NI'
  | 'es_PA'
  | 'es_PE'
  | 'es_PR'
  | 'es_PY'
  | 'es_SV'
  | 'es_US'
  | 'es_UY'
  | 'es_VE'
  | 'ee'
  | 'et_EE'
  | 'eu_ES'
  | 'fa_IR'
  | 'fi'
  | 'fi_FI'
  | 'fo_FO'
  | 'fr'
  | 'fr_BE'
  | 'fr_CA'
  | 'fr_CH'
  | 'fr_FR'
  | 'fr_LU'
  | 'ga_IE'
  | 'gl_ES'
  | 'gv_GB'
  | 'he_IL'
  | 'hi_IN'
  | 'hr_HR'
  | 'hu'
  | 'hu_HU'
  | 'id_ID'
  | 'is'
  | 'is_IS'
  | 'it'
  | 'it_CH'
  | 'it_IT'
  | 'iw_IL'
  | 'jp'
  | 'jp_JP'
  | 'ja'
  | 'ja_JP'
  | 'ka_GE'
  | 'kk_KZ'
  | 'kl_GL'
  | 'ko_KR'
  | 'kw_GB'
  | 'lo_LA'
  | 'lt_LT'
  | 'lt'
  | 'lv_LV'
  | 'lv'
  | 'mi_NZ'
  | 'mk_MK'
  | 'mr_IN'
  | 'ms_MY'
  | 'mt_MT'
  | 'nl_BE'
  | 'nl_NL'
  | 'no'
  | 'nn_NO'
  | 'no_NO'
  | 'oc_FR'
  | 'pl_PL'
  | 'pt'
  | 'pt_BR'
  | 'pt_PT'
  | 'rm_CH'
  | 'ro_RO'
  | 'ru'
  | 'ru_RU'
  | 'ru_KZ'
  | 'ru_UA'
  | 'ru_BY'
  | 'se_NO'
  | 'sk_SK'
  | 'sl_SI'
  | 'sq_AL'
  | 'sq_XK'
  | 'sr'
  | 'sr_RS'
  | 'sr_YU'
  | 'sr_XK'
  | 'sv'
  | 'sv_FI'
  | 'sv_SE'
  | 'ta_IN'
  | 'te_IN'
  | 'tg_TJ'
  | 'th_TH'
  | 'tl_PH'
  | 'tr_TR'
  | 'uk_UA'
  | 'ur_PK'
  | 'uz_UZ'
  | 'vi_VN'
  | 'wa_BE'
  | 'yi_US'
  | 'zh'
  | 'zh_CN'
  | 'zh_HK'
  | 'zh_TW'
  | 'xx_EX'
  | 'xx_IN';

/**
 * Log level for [[Stage.logMessage]]
 *
 * 0: emergency
 * 1: alert
 * 2: critical
 * 3: error
 * 4: warning
 * 5: notice
 * 6: info
 * 7: debug
 */
type LogLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

type PageObject = {
  /** Frequence in sitemap */
  googlesitemap_freq: SitemapFrequence;
  /** Page uuid */
  id: Uuid;
  /** Language code */
  lang: Language;
  /** Last update unix timestamp in milliseconds */
  last_updated_msec: number;
  /**
   * Left value in tree structure
   *
   * <aside class="warning">
   * `lft` and `rgt` are not updated when pages are moved inside a level, they are only useful for indicating if a page is a parent or child of another page. Do not use them as a method of sorting pages if you expect them to be ordered the same way as pages are in Stage.
   *
   * Stage.pages.get() and the navigation element return sorted pages.
   * */
  lft: number;
  /** Page metadata */
  meta_data: Record<string, any>;
  /** Page description */
  meta_description: string;
  /** Page keywords */
  meta_keywords: string;
  /** Page name */
  name: string;
  /** If `true`, search engines don't index the page */
  norobots: boolean;
  /**
   * Page parameters in JSON stringified object
   *
   * <aside class="notice">
   * If there are no parameters, this is an empty string.
   * </aside>
   */
  params: string;
  /** Page parent uuid */
  parent: '0' | Uuid;
  /**
   * This is `true` if page is not "dirty".
   *
   * Being dirty means that the page is not published or the working version differs from the published version.
   */
  published: boolean;
  /**
   * Redirect target.
   *
   * Empty if no redirection.
   */
  redirect: string;
  /** Right value in tree structure */
  rgt: number;
  /** Site id */
  site_id: string;
  /** Reference to the current language version (not usable in code) */
  stage_pageurl: string;
  /** Reference to the page */
  stage_url: PageReference;
  /** `true` if this is the start page of this site */
  startpage: boolean;
  /** Page title */
  title: string;
  /**
   * Depth in the page tree structure.
   *
   * Root level is 0
   */
  tree_level: number;
  /** Relative path to the page */
  url: string;
  /**
   * URL id
   *
   * This id isn't usable anywhere, but it is unique for each URL
   */
  url_id: number;
  /** Page URL name (path name) */
  urlname: string;
};

type ResultRow = Record<string, any>;

/**
 * Page reference is in format cm-page://[[Uuid]]/
 */
type PageReference = string;

type RequestType = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

type SessionCallback = {
  /**
   * Scriptlet reference
   */
  callback: string;
  /**
   * Time of inactivity after which callback is triggered
   */
  timeout: number | 'expiry';
  /**
   * Defines if callback is removed after the timeout after inactivity. Will always be removed upon session expiry.
   */
  remove_after: boolean;
};

/**
 * Session object.
 */
type SessionObject = Record<string, any>;

type SitemapFrequence = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

type TaskObject = {
  id: string;
  status: TaskStatus;
  type: string;
  title: string;
  params: TaskParameters;
  last_updated: string;
  retdata: TaskReturnData | null;
};

type TaskParameters = Record<string, any>;

type TaskReturnData = Record<string, any>;

type TaskStatus = 'new' | 'running' | 'done' | 'failed';

type Token = [string, string, number, number, TokenArray?, number?];

interface TokenArray extends Array<Token> {}

/**
 * Stage uuids are 22 characters long and match pattern [^a-zA-Z0-9_\-]
 */
type Uuid = string;

type ExplainObject = {
  /** Query type */
  type: 'simple' | 'subquery' | 'dependent subquery' | 'derived' | 'uncacheable subquery';
  /** Table name */
  table: string;
  /** Possible keys */
  possibleKeys: {
    [key: number]: string;
  } | null;
  /** Used keys */
  key: {
    [key: number]: string;
  } | null;
  /** Key length */
  keyLength: string | null;
  /** Number of rows */
  rows: string;
};

type KeyValueStoreType = 'mysql' | 'redis';
type KeyValueStoreValue = any;

type KeyValueStoreSettings = {
  type?: KeyValueStoreType;
  store?: string;
};
type KeyValueStoreSortedSetMember = [number, KeyValueStoreValue];
type EncryptWithAlgoObject = {
  iv: string;
  ciphertext: string;
};
type EncryptWithAlgoResponse = EncryptWithAlgoObject | string;
