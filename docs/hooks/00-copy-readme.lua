---@diagnostic disable-next-line: undefined-global
local wdir = workingdir

local json = require("json")

ForFile = "index.md"

function Writer(filedata)
	local sourcedata = json.decode(filedata)
	local f = assert(io.open(wdir .. "/../readme.md", "rb"))
	local content = f:read("*all")
	f:close()
	sourcedata.content = content
	return json.encode(sourcedata)
end
