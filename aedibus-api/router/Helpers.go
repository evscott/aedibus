package router

import "bytes"

/**
 * pb: a "Path Builder", use to consolidate a list of paths into a single string.
 */
func pb(paths...string) string {
	var buffer bytes.Buffer

	if len(paths) == 0 {
		buffer.WriteString("/")
	}
	for _, path := range paths {
		buffer.WriteString(path)
	}

	return buffer.String()
}
