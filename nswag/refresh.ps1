Set-Location ../src/shared/service-proxies

$serviceProxies = (Get-Content -Raw -Path "service-proxies.ts" )

$serviceProxiesOutput = $serviceProxies.Replace('import * as moment','import moment')

Set-Content -Encoding "UTF8NoBOM" -Path "service-proxies.ts" -Value $serviceProxiesOutput
